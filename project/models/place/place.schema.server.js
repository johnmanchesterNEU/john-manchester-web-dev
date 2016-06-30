module.exports = function () {
    var mongoose = require("mongoose");


    //Create a 2d index to make location searches faster
    var PlaceSchema = mongoose.Schema({
        name:String,
        country: String,
        region: String,
        locality: String,
        address: String,
        establishment: String, // If it is place like The Louvre
        comments: [{type:mongoose.Schema.ObjectId, ref:"Comment"}],
        name: String,
        id :  {type: String, unique: true}, // googles place id must be unique
        fid: {type: String, unique: true}, // flickr place Id also unique
        loc:{
            type: [Number], //[<longitude>,<latitude>]
            index: '2d'  //create the geospatial index
        }
    }, {collection: "project.place"});

    return PlaceSchema;
};