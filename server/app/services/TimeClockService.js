'use strict'

/**
 * @property {String} objectId
 * @property {String} name
 * @property {Number} birthday
 */
class TimeClock extends Backendless.ServerCode.PersistenceItem {}

class TimeClockService {
	/**
   * @description List all timeclocks
   * @route GET /
   * @returns {Promise.<TimeClock[]>}
   */
	getAll() {
		return TimeClock.find()
	}

	/**
   * @description Make a new timeclock
   * @route POST /
   * @param {TimeClock} timeclock The timeclock JSON you want to post
   * @returns {Promise.<TimeClock>}
   */
	create(timeclock) {
		return timeclock.save()
	}

	/**
   * @description Save timeclock
   * @route PUT /
   * @param {TimeClock} timeclock The timeclock JSON you want to save
   * @returns {Promise.<TimeClock>}
   */
	save(timeclock) {
		return timeclock.save()
	}

	/**
   * @description Sends the timeclock with timeclock Id
   * @route GET /{timeclockId}
   * @returns {Promise.<TimeClock>}
   */
	getTimeClock() {
		return Pet.findById(this.request.pathParams.timeclockId)
	}

	/**
   * @typedef {Object} TimeClockDeleteResponse
   * @property {Number} deletionTime
   */

	/**
   * @description Delete the pet by timeclock Id
   * @route DELETE /{timeclockId}
   * @returns {Promise.<TimeClockDeleteResponse>}
   */
	deleteTimeClock() {
		return TimeClock.remove(this.request.pathParams.timeclockId)
	}
}

Backendless.ServerCode.addService(TimeClockService)
