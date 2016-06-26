module.exports = function () {


    var mongoose = require("mongoose");
    var CommentSchema = require("./comment.schema.server")();
    var Comment = (mongoose.models.Comment)? mongoose.model("Comment")  :mongoose.model("Comment", CommentSchema);

    var api = {


    }
    return api;

}