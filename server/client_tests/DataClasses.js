//Backendless: defaults
var APPLICATION_ID = '9D96215E-2443-01D3-FF5F-0FB6FD2E0600'
var API_KEY = '2ACF37D6-905D-7940-FFB3-D31A5ADE5B00'
Backendless.serverURL = 'https://api.backendless.com'
Backendless.initApp(APPLICATION_ID, API_KEY)

if (!APPLICATION_ID || !API_KEY)
	alert(
		'Missing application ID or api key arguments. Login to Backendless Console, select your app and get the ID and key from the Manage > App Settings screen. Copy/paste the values into the Backendless.initApp call located in AndrewsAdmin-Data.js'
	)

var $rootScope = window

function cleanPrivateRelations(data) {
	function isObject(obj) {
		return obj !== null && typeof obj === 'object'
	}

	if (data.hasOwnProperty('_private_relations') && data['_private_relations'].length > 0) {
		data['_private_relations'].forEach(function(relation) {
			if (data.hasOwnProperty(relation) && isObject(data[relation])) {
				if (Array.isArray(data[relation])) {
					data[relation].forEach(function(elem) {
						if (isObject(elem)) {
							cleanPrivateRelations(elem)
						}
					})
				} else {
					cleanPrivateRelations(data[relation])
				}
			}
		})
	}

	if (isObject(data)) {
		delete data['_private_relations']
		delete data['_private_geoRelations']
		delete data['_private_dates']
	}
}

$rootScope.Classes = {
	Order: function Order(args) {
		args = args || {}

		this.updated = args.updated || null
		this.orderPrice = args.orderPrice || null
		this.created = args.created || null
		this.customername = args.customername || null
		this.ownerId = args.ownerId || null
		this.objectId = args.objectId || null

		this._private_relations = []
		this._private_geoRelations = []
		this._private_dates = [ 'updated', 'created' ]
		this.___class = 'Order'

		var storage = Backendless.Persistence.of(Order)

		this.save = function() {
			cleanPrivateRelations(this)
			storage.save(this)
		}

		this.remove = function() {
			storage.remove(this).then((result) => {
				this.objectId = null
				return result
			})
		}

		this._private_describeClass = function() {
			return Backendless.Persistence.describe(this.___class)
		}
	},
	SampleModel: function SampleModel(args) {
		args = args || {}

		this.ownerId = args.ownerId || null
		this.updated = args.updated || null
		this.customername = args.customername || null
		this.created = args.created || null
		this.objectId = args.objectId || null
		this.name = args.name || null

		this._private_relations = []
		this._private_geoRelations = []
		this._private_dates = [ 'updated', 'created' ]
		this.___class = 'SampleModel'

		var storage = Backendless.Persistence.of(SampleModel)

		this.save = function() {
			cleanPrivateRelations(this)
			storage.save(this)
		}

		this.remove = function() {
			storage.remove(this).then((result) => {
				this.objectId = null
				return result
			})
		}

		this._private_describeClass = function() {
			return Backendless.Persistence.describe(this.___class)
		}
	},
	TimeClock: function TimeClock(args) {
		args = args || {}

		this.out_device = args.out_device || null
		this.in_picture_url = args.in_picture_url || null
		this.objectId = args.objectId || null
		this.break_time = args.break_time || null
		this.out_timestamp = args.out_timestamp || null
		this.status = args.status || null
		this.approved_by = args.approved_by || null
		this.end_timestamp = args.end_timestamp || null
		this.in_device = args.in_device || null
		this.employee = args.employee || null
		this.updated = args.updated || null
		this.ownerId = args.ownerId || null
		this.out_gps = args.out_gps || null
		this.in_timestamp = args.in_timestamp || null
		this.in_gps = args.in_gps || null
		this.events = args.events || null
		this.notes = args.notes || null
		this.out_location = args.out_location || null
		this.out_picture_url = args.out_picture_url || null
		this.in_location = args.in_location || null
		this.approved_notes = args.approved_notes || null
		this.start_timestamp = args.start_timestamp || null
		this.created = args.created || null
		this.current_length = args.current_length || null
		this.approved_time = args.approved_time || null
		this.length = args.length || null

		this._private_relations = []
		this._private_geoRelations = []
		this._private_dates = [
			'out_timestamp',
			'end_timestamp',
			'updated',
			'in_timestamp',
			'start_timestamp',
			'created'
		]
		this.___class = 'TimeClock'

		var storage = Backendless.Persistence.of(TimeClock)

		this.save = function() {
			cleanPrivateRelations(this)
			storage.save(this)
		}

		this.remove = function() {
			storage.remove(this).then((result) => {
				this.objectId = null
				return result
			})
		}

		this._private_describeClass = function() {
			return Backendless.Persistence.describe(this.___class)
		}
	},
	Pet: function Pet(args) {
		args = args || {}

		this.birthday = args.birthday || null
		this.ownerId = args.ownerId || null
		this.updated = args.updated || null
		this.name = args.name || null
		this.objectId = args.objectId || null
		this.created = args.created || null

		this._private_relations = []
		this._private_geoRelations = []
		this._private_dates = [ 'updated', 'created' ]
		this.___class = 'Pet'

		var storage = Backendless.Persistence.of(Pet)

		this.save = function() {
			cleanPrivateRelations(this)
			storage.save(this)
		}

		this.remove = function() {
			storage.remove(this).then((result) => {
				this.objectId = null
				return result
			})
		}

		this._private_describeClass = function() {
			return Backendless.Persistence.describe(this.___class)
		}
	}
}
