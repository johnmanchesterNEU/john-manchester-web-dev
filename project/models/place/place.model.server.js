module.exports = function () {


    var mongoose = require("mongoose");
    var PlaceSchema = require("./place.schema.server")();
    var Place = (mongoose.models.Place)? mongoose.model("Place")  :mongoose.model("Place", PlaceSchema);

    var api = {
        createPlace:createPlace,
        updatePlace:updatePlace,
        deletePlace:deletePlace,
    }
    return api;


    function deletePlace(id) {
        Place.delete({"_id" : id});
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