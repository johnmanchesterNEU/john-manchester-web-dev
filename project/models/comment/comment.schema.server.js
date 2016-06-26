module.exports = function () {
    var mongoose = require("mongoose");

//Schema for comments
    var CommentSchema = mongoose.Schema({
        title: String, // title of the comment
        comments: [{type:mongoose.Schema.ObjectId, ref:"User"}], //user who made comments
        comment: String,
        date: {type: Date, default: Date.now()}
    }, {collection: "project.comment"});

    return CommentSchema;
};