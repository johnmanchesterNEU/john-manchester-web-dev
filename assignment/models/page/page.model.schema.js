module.exports = function(){

    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref: "Website"},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Widget'}],
        dateCreated: {type: Date, default:Date.now()}
    },{collection: "assignment.page"});

    return PageSchema;
};
// {"_id": "321", "name": "Post 1", "websiteId": "456", "title": "hello"},


// .populate() // replaces it with the object!!!!!