module.exports = function () {
    var mongoose = require("mongoose");


    //Create a 2d index to make location searches faster
    var TripSchema = mongoose.Schema({
        name: String, // name of the trip
        start: Date,
        end: Date,
        places: [{type:ObjectId, ref:"Place"}],
        comments: [{type:mongoose.Schema.ObjectId, ref:"Comment"}]
    }, {collection: "project.trip"});

    return TripSchema;
};