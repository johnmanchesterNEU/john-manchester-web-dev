module.exports = function () {


    var mongoose = require("mongoose");
    var TripSchema = require("./trip.schema.server")();
    var Trip = (mongoose.models.Trip)? mongoose.model("Trip")  :mongoose.model("Trip", TripSchema);

    var api = {


    }
    return api;

}