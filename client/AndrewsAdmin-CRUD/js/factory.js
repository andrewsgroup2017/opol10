
function getRandomString() {
    return Math.random().toString(36).substr(2, 7);
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

$rootScope.tablesList = {
	Order : function(obj) {
		obj = obj || new $rootScope.Classes.Order();
		obj.orderPrice = Number(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.customername = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));

		return obj;
	},
	SampleModel : function(obj) {
		obj = obj || new $rootScope.Classes.SampleModel();
		obj.customername = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.name = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));

		return obj;
	},
	TimeClock : function(obj) {
		obj = obj || new $rootScope.Classes.TimeClock();
		obj.out_device = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.in_picture_url = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.break_time = Number(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.out_timestamp = new Date();
		obj.status = Number(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.approved_by = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.end_timestamp = new Date();
		obj.in_device = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.employee = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.out_gps = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.in_timestamp = new Date();
		obj.in_gps = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.events = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.notes = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.out_location = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.out_picture_url = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.in_location = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.approved_notes = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.start_timestamp = new Date();
		obj.current_length = Number(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.approved_time = Number(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.length = Number(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));

		return obj;
	},
	Pet : function(obj) {
		obj = obj || new $rootScope.Classes.Pet();
		obj.birthday = Number(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));
		obj.name = String(Math.abs(Math.floor(Math.random()*Math.pow(10, 5) - 1)));

		return obj;
	}
};

$rootScope.createInstanceOf = function(table) {
    return tablesList[table]();
};