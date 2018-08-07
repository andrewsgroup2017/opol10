'use strict'

class TimeClock extends Backendless.ServerCode.PersistenceItem {
	constructor() {
		super()

		/**
     @name TimeClock#name
     @type String
     */
		this.name = undefined
	}
}

module.exports = Backendless.ServerCode.addType(TimeClock)
