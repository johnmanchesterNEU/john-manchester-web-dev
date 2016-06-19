module.exports = function(){
    var mongoose = require("mongoose");

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
        dateCreated: {type: Date, default:Date.now()}
    }, {collection: "assignment.website"});

    return WebsiteSchema;
};

// {"_id": "123", "name": "Facebook", "developerId": "456", "description": "blah"},


/*
 var WebsiteSchema = mongoose.schema({
 _user:{type: mongoose.Schema.objectId, ref:"User"},
 name: String,
 description: String,
 pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
 dateCreated: {type: Date, default:Date.now()}
 }, {collection: "assignment.website"});

 return WebsiteSchema;*/