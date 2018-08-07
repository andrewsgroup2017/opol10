'use strict'

class Pet extends Backendless.ServerCode.PersistenceItem {
	constructor() {
		super()

		/**
     @name Pet#name
     @type String
     */
		this.name = undefined
	}
}

module.exports = Backendless.ServerCode.addType(Pet)
