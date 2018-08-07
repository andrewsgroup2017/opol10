
//Backendless: defaults
var APPLICATION_ID = '9D96215E-2443-01D3-FF5F-0FB6FD2E0600';
var API_KEY = '2ACF37D6-905D-7940-FFB3-D31A5ADE5B00';
Backendless.serverURL = "https://api.backendless.com";
Backendless.initApp(APPLICATION_ID, API_KEY);

if (!APPLICATION_ID || !API_KEY)
    alert("Missing application ID or api key arguments. Login to Backendless Console, select your app and get the ID and key from the Manage > App Settings screen. Copy/paste the values into the Backendless.initApp call located in AndrewsAdmin-CRUD.js");
    

function cleanPrivateRelations(data) {
    function isObject(obj) {
        return obj !== null && typeof obj === 'object';
    }

    if (data.hasOwnProperty('_private_relations') && data['_private_relations'].length > 0) {
            data['_private_relations'].forEach(function(relation) {
                if (data.hasOwnProperty(relation) && isObject(data[relation])) {
                    if (Array.isArray(data[relation])) {
                        data[relation].forEach(function(elem) {
                            if (isObject(elem)) {
                                cleanPrivateRelations(elem);
                            }
                        });
                    } else {
                        cleanPrivateRelations(data[relation]);
                }
            }
        });
    }

    if (isObject(data)) {
        delete data['_private_relations'];
        delete data['_private_geoRelations'];
        delete data['_private_dates'];
    }
}

$rootScope.Classes = {
Order: function Order( args ){
    args = args || {};
    this._private_relations = [];
    this._private_geoRelations = [];
    this._private_dates = [
        "updated",
        "created"];
    this.___class = "Order";

    
    var storage = Backendless.Persistence.of( Order );
    this.save = function ( async ) {
        cleanPrivateRelations(this);
        storage.save( this, async );
    };
    this._private_describeClass = function(){
        return Backendless.Persistence.describe(this.___class);
    };
    this.remove = function ( async ) {
        var result = storage.remove( this, async );
        this.objectId = null;
        return result;
    };
    
   },SampleModel: function SampleModel( args ){
    args = args || {};
    this._private_relations = [];
    this._private_geoRelations = [];
    this._private_dates = [
        "updated",
        "created"];
    this.___class = "SampleModel";

    
    var storage = Backendless.Persistence.of( SampleModel );
    this.save = function ( async ) {
        cleanPrivateRelations(this);
        storage.save( this, async );
    };
    this._private_describeClass = function(){
        return Backendless.Persistence.describe(this.___class);
    };
    this.remove = function ( async ) {
        var result = storage.remove( this, async );
        this.objectId = null;
        return result;
    };
    
   },TimeClock: function TimeClock( args ){
    args = args || {};
    this._private_relations = [];
    this._private_geoRelations = [];
    this._private_dates = [
        "out_timestamp",
        "end_timestamp",
        "updated",
        "in_timestamp",
        "start_timestamp",
        "created"];
    this.___class = "TimeClock";

    
    var storage = Backendless.Persistence.of( TimeClock );
    this.save = function ( async ) {
        cleanPrivateRelations(this);
        storage.save( this, async );
    };
    this._private_describeClass = function(){
        return Backendless.Persistence.describe(this.___class);
    };
    this.remove = function ( async ) {
        var result = storage.remove( this, async );
        this.objectId = null;
        return result;
    };
    
   },Pet: function Pet( args ){
    args = args || {};
    this._private_relations = [];
    this._private_geoRelations = [];
    this._private_dates = [
        "updated",
        "created"];
    this.___class = "Pet";

    
    var storage = Backendless.Persistence.of( Pet );
    this.save = function ( async ) {
        cleanPrivateRelations(this);
        storage.save( this, async );
    };
    this._private_describeClass = function(){
        return Backendless.Persistence.describe(this.___class);
    };
    this.remove = function ( async ) {
        var result = storage.remove( this, async );
        this.objectId = null;
        return result;
    };
    
   }
}