module.exports = function () {


    var mongoose = require("mongoose");
    var MediaSchema = require("./media.schema.server")();
    var Media = (mongoose.models.Media)? mongoose.model("Media")  :mongoose.model("Media", MediaSchema);

    var api = {
        addPhotos : addPhotos
    }
    return api;

    function addPhotos(photos) {
        console.log(photos);
       return Media.collection.insert(photos);
    }


}