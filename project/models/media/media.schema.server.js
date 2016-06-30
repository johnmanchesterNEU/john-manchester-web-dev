module.exports = function () {
    var mongoose = require("mongoose");

    //  var PageSchema = require("../page/page.model.schema")();
    //pages[PageSchema];

    //Birthday is set to string browsers don't have a unified way to handle

    var MediaSchema = mongoose.Schema({

        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        title: String,
        description: String,
        datetaken: Date,
        width: Number,
        height: Number,
        rating:Number,
        place: {type: mongoose.Schema.ObjectId, ref: "Place"},
        comments: [{type: mongoose.Schema.ObjectId, ref:"Comment"}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.media"});

    return MediaSchema;
};