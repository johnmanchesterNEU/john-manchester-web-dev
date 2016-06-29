module.exports = function () {
    var mongoose = require("mongoose");

    //  var PageSchema = require("../page/page.model.schema")();
    //pages[PageSchema];

    //Birthday is set to string browsers don't have a unified way to handle

    var UserSchema = mongoose.Schema({
        local: {
            username: {type: String, unique: true},
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            gender: String,
            birthday: String,
            country: String,
        },
        facebook: {
            id: String,
            token: String,
            displayName: String,
            email: String
        },

        google: {
            id: String,
            token: String,
            email: String,
            displayName: String
        },

        flickr: {
            id: String,
            token: String,
            tokenSecret:String,
            displayName: String,
            email: String
        },
        follows : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        followedBy : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        // websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "project.user"});

    return UserSchema;
};