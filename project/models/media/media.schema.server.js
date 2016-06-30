module.exports = function () {
    var mongoose = require("mongoose");

    //  var PageSchema = require("../page/page.model.schema")();
    //pages[PageSchema];

    //Birthday is set to string browsers don't have a unified way to handle

    var MediaSchema = mongoose.Schema({

        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        photo_id:  {type: String, unique: true}, //flickrs photo_id so we don't have dupes
        title: String,
        description: String,
        datetaken: Date,
        width: Number,
        height: Number,
        rating:Number,
        type: String,
        media:String,
        secret: String, // for flickr purposes
        place: {type: mongoose.Schema.ObjectId, ref: "Place"},
        comments: [{type: mongoose.Schema.ObjectId, ref:"Comment"}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.media"});

    return MediaSchema;
};