module.exports = function(){
    var mongoose = require("mongoose");

  //  var PageSchema = require("../page/page.model.schema")();
    //pages[PageSchema];

    var UserSchema = mongoose.Schema({
        username: {type:String, required: true, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        dob: Date,
        country: String,
        facebook:{
            id: String,
            token:String,
            displayName: String
        },

        google:{
            id: String,
            token: String,
            displayName: String
        },

        flickr:{
            id: String,
            token: String,
            displayName: String
        },
       // websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        dateCreated: {type: Date, default:Date.now()}
    },{collection: "project.user"});

    return UserSchema;
};