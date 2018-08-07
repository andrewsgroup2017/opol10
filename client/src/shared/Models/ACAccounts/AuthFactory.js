import GoogleAuth from './Google/GoogleAuth'
import MicrosoftAuth from './Microsoft/MicrosoftAuth'
import TrelloAuth from './Trello/TrelloAuth'
import AndrewsAuth from './Andrews/AndrewsAuth'
import SlackAuth from './Slack/SlackAuth'
import CoreACAuth from './CoreACAuth'

const MAPPING = {
	[GoogleAuth.namespace]: GoogleAuth,
	[MicrosoftAuth.namespace]: MicrosoftAuth,
	[AndrewsAuth.namespace]: AndrewsAuth,
	[SlackAuth.namespace]: SlackAuth
}

class AuthFactory {
	/**
  * Modelizes a service
  * @param data: the service data
  * @return the model version
  */
	static modelizeAuth(data) {
		const Class = MAPPING[data.namespace] || CoreACAuth
		return new Class(data)
	}
}

export default AuthFactory
