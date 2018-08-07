'use strict'
var unirest = require('unirest')
const oauth = 'https://www.humanity.com/oauth2/token.php'
const api = Backendless.ServerCode.User.afterLogin((req, res) => {
	if (res.result) {
		console.log(res.result.id)
		const id = res.result.id
		var Request = unirest
			.post(oauth)
			.headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
			.send('client_id=8fca92a4a5276109256648f2d9fc0dda23187c21')
			.send('client_secret=4fc5583b5f14f6f999b4d5b071e708b52be23467')
			.send('grant_type=password')
			.send('username=andrewsgroup')
			.send('password=sugarlips42')
			.end(function(_response) {
				var response = _response.body
				var req = unirest('GET', 'https://try.readme.io/https://www.humanity.com/api/v2/timeclocks')
				req.query({
					start_date: '5/01/2018',
					end_date: '6/01/2018',
					employee: id,
					access_token: response.access_token
				})
				req.headers({
					'Postman-Token': '05b2da32-53c9-460e-a9b5-6d956e2ce97e',
					'Cache-Control': 'no-cache',
					'Content-Type': 'application/x-www-form-urlencoded',
					'User-Agent':
						'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36',
					Origin: 'https://platform.humanity.com',
					Referer: 'https://platform.humanity.com/v2.0/reference',
					'Sec-Metadata': 'cause=forced, destination=\\"\\", target=subresource, site=cross-site',
					Accept: 'application/json'
				})
				req.end(function(res) {
					if (res.error)
						throw new Error(function(res) {
							console.log(res.error)
							return res.error
						})
					return res.body
				})
			})
	}
})
