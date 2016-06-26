module.exports = function () {


    var mongoose = require("mongoose");
    var PlaceSchema = require("./place.schema.server")();
    var Place = (mongoose.models.Place)? mongoose.model("Place")  :mongoose.model("Place", PlaceSchema);

    var api = {


    }
    return api;

}