// import packagedCredentials from 'shared/credentials'
const packagedCredentials = {
	API_KEY: 'eyJ0b2tlbiI6IjIyYmFhZDc0NDMyZjQ4NzRiNjc3NmIxYjY4YjMyZWY5IiwiZW1haWwiOiJhc2hlZG93bmluZ0Bob3RtYWlsLmNvbSJ9'
}

class Bootstrap {
	/* **************************************************************************/
	// Lifecycle
	/* **************************************************************************/

	constructor() {
		this.__data__ = {
			clientId: window.bootstrap.clientId,
			clientToken: window.config.client_token || window.bootstrap.clientToken,
			credentials: packagedCredentials.API_KEY
				? Object.assign({}, window.config.credentials)
				: packagedCredentials
		}
		delete window.config
		delete window.bootstrap
	}

	/* **************************************************************************/
	// Properties
	/* **************************************************************************/

	get clientId() {
		return this.__data__.clientId
	}
	get clientToken() {
		return this.__data__.clientToken
	}
	get credentials() {
		return this.__data__.credentials
	}
}

export default new Bootstrap()
