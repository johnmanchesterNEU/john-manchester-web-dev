module.exports = function () {
    var mongoose = require("mongoose");


    //Create a 2d index to make location searches faster
    var PlaceSchema = mongoose.Schema({
        country: String,
        region: String,
        city: String,
        address: String,
        comments: [{type:mongoose.Schema.ObjectId, ref:"Comment"}],
        name: String,
        loc:{
            type: [Number], //[<longitude>,<latitude>]
            index: '2d'  //create the geospatial index
        }
    }, {collection: "project.place"});

    return PlaceSchema;
};