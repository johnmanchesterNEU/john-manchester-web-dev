module.exports = function () {


    var mongoose = require("mongoose");
    var Promise = require('mpromise');
    var PlaceSchema = require("./place.schema.server")();
    var Place = (mongoose.models.Place)? mongoose.model("Place")  :mongoose.model("Place", PlaceSchema);

    var api = {
        createPlace:createPlace,
        updatePlace:updatePlace,
        deletePlace:deletePlace,
        getPlaces:getPlaces
    }
    return api;


    function getPlaces() {
        return Place.find({}).exec();
    }
    
    
    function deletePlace(id) {
        return Place.delete({"_id" : id});
    }

    function updatePlace(place){
        var Place = new User(place);
        return newPlace.save();
    }

    function createPlace(place){
        console.log("------PLACES INSERT--------")
        console.log(place);
        return Place.create(place);
    }
}