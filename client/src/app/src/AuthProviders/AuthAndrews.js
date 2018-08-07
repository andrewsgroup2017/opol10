import { ipcMain } from 'electron'
import { WB_AUTH_ANDREWS, WB_AUTH_ANDREWS_COMPLETE, WB_AUTH_ANDREWS_ERROR } from 'shared/ipcEvents'
import { URL } from 'url'
import querystring from 'querystring'
import AuthWindow from 'Windows/AuthWindow'

const TOKEN_REGEX = new RegExp(/[&#]?token=([0-9a-f]{64})/)

class AuthAndrews {
	/* ****************************************************************************/
	// Lifecycle
	/* ****************************************************************************/

	constructor() {
		ipcMain.on(WB_AUTH_ANDREWS, (evt, body) => {
			this.handleAuthAndrews(evt, body)
		})
	}

	/* ****************************************************************************/
	// Authentication
	/* ****************************************************************************/

	/**
  * Generates the authentication url for our secrets, scopes and access type
  * @param credentials: the credentials to use
  * @param appKey: the key to authenticate against
  * @return the url that can be used to authenticate with goog
  */
	generateAuthenticationURL(credentials, appKey) {
		return (
			'http://localhost:8080/authorize' +
			querystring.stringify({
				return_url: credentials.ANDREWS_AUTH_RETURN_URL,
				callback_method: 'fragment',
				scope: 'read,account',
				expiration: 'never',
				name: credentials.ANDREWS_AUTH_APP_NAME,
				key: appKey
			})
		)
	}

	/**
  * Gets the authorization code by prompting the user to sign in
  * @param credentials: the credentials to use
  * @param partitionId: the id of the partition
  * @return promise
  */
	promptUserToGetAuthorizationCode(credentials, partitionId) {
		return new Promise((resolve, reject) => {
			const waveboxOauthWin = new AuthWindow()
			waveboxOauthWin.create('http://localhost:8080/login', {
				useContentSize: true,
				center: true,
				show: true,
				resizable: false,
				standardWindow: true,
				autoHideMenuBar: true,
				title: 'Andrews',
				height: 750,
				webPreferences: {
					nodeIntegration: false,
					contextIsolation: true,
					sandbox: true,
					nativeWindowOpen: true,
					sharedSiteInstances: true,
					partition: partitionId
				}
			})
			const oauthWin = waveboxOauthWin.window
			let appKey
			let userClose = true
			let appKeyInfoShown = false

			oauthWin.on('closed', () => {
				if (userClose) {
					reject(new Error('User closed the window'))
				}
			})

			// User logs into to andrews correctly. Redirect to get app-key
			oauthWin.webContents.on('did-navigate', (evt, nextURL) => {
				const { hostname, pathname } = new URL(nextURL)
				if (hostname === 'localhost' && pathname === '/') {
					oauthWin.hide()
					oauthWin.loadURL('http://localhost:8080/app-key')
				}
			})

			// App-key page starts to load. Hide window
			oauthWin.webContents.on('will-navigate', (evt, nextUrl) => {
				const { hostname, pathname } = new URL(nextUrl)
				if (hostname === 'localhost' && pathname.startsWith('/app-key')) {
					oauthWin.hide()
				}
			})

			// App-key page loads correctly. Either fetch app key or prompt user to authorize
			oauthWin.webContents.on('dom-ready', (evt) => {
				const currentUrl = oauthWin.webContents.getURL()
				const { hostname, pathname } = new URL(currentUrl)
				if (hostname === 'localhost' && pathname.startsWith('/app-key')) {
					oauthWin.webContents.executeJavaScript('(document.getElementById("key") || {}).value', (key) => {
						// Able to fetch app key - continue
						if (key) {
							appKey = key
							oauthWin.loadURL(this.generateAuthenticationURL(credentials, key))
						} else {
							// User needs to agree to use app key. Either show more info or show andrews page
							if (appKeyInfoShown) {
								oauthWin.show()
							} else {
								oauthWin.loadURL(credentials.ANDREWS_APP_KEY_INFO)
								appKeyInfoShown = true
							}
						}
					})
				}
			})

			// Deal with ensuring the window is visible
			// 1. User starts to authorize wavebox with app key
			// 2. User visits the app key info page
			oauthWin.webContents.on('did-navigate', (evt, nextURL) => {
				const { hostname, pathname } = new URL(nextURL)
				if (hostname === 'localhost' && pathname.startsWith('/1/authorize')) {
					// Start app-auth process
					setTimeout(() => {
						oauthWin.show()
					}, 250) // Timeout for jank
				} else if (nextURL.startsWith(credentials.ANDREWS_APP_KEY_INFO)) {
					// Show apikey info
					setTimeout(() => {
						oauthWin.show()
					}, 250) // Timeout for jank
				}
			})

			// User gives permission for wavebox - fetch token and app key and finish
			oauthWin.webContents.on('will-navigate', (evt, nextUrl) => {
				if (nextUrl.indexOf(credentials.ANDREWS_AUTH_RETURN_URL) === 0) {
					evt.preventDefault()
					userClose = false
					oauthWin.close()
					const token = TOKEN_REGEX.exec(nextUrl)
					if (token && token.length === 2) {
						resolve({ appKey: appKey, token: token[1] })
					} else {
						reject(new Error('Failed to aquire token `' + nextUrl + '`'))
					}
				}
			})
		})
	}

	/* ****************************************************************************/
	// Request Handlers
	/* ****************************************************************************/

	/**
  * Handles the oauth request
  * @param evt: the incoming event
  * @param body: the body sent to us
  */
	handleAuthAndrews(evt, body) {
		Promise.resolve().then(() => this.promptUserToGetAuthorizationCode(body.credentials, body.partitionId)).then(
			({ appKey, token }) => {
				evt.sender.send(WB_AUTH_ANDREWS_COMPLETE, {
					mode: body.mode,
					context: body.context,
					auth: {
						appKey: appKey,
						token: token
					}
				})
			},
			(err) => {
				evt.sender.send(WB_AUTH_ANDREWS_ERROR, {
					mode: body.mode,
					context: body.context,
					error: err,
					errorString: (err || {}).toString ? (err || {}).toString() : undefined,
					errorMessage: (err || {}).message ? (err || {}).message : undefined,
					errorStack: (err || {}).stack ? (err || {}).stack : undefined
				})
			}
		)
	}
}

export default AuthAndrews
