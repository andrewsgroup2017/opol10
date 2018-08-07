import ServiceDataReducer from './ServiceDataReducer'

class AndrewsServiceDataReducer extends ServiceDataReducer {
	/* **************************************************************************/
	// Class
	/* **************************************************************************/

	static get name() {
		return 'AndrewsServiceDataReducer'
	}

	/* **************************************************************************/
	// Reducers
	/* **************************************************************************/

	/**
  * Sets the unread notifications
  * @param service: the parent service
  * @param serviceData: the service to update
  * @param notifications: the updated notifications
  */
	static setUnreadNotifications(service, serviceData, notifications) {
		return serviceData.changeData({
			unreadNotifications: notifications.filter((notif) => {
				return notif.unread === true || notif.unread === undefined
			})
		})
	}
}

export default AndrewsServiceDataReducer
