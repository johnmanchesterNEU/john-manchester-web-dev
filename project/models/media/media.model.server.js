module.exports = function () {


    var mongoose = require("mongoose");
    var MediaSchema = require("./media.schema.server")();
    var Media = (mongoose.models.Media)? mongoose.model("Media")  :mongoose.model("Media", MediaSchema);

    var api = {


    }
    return api;

}