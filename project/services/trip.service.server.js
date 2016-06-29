var flickrApi = require('flickr-oauth-and-upload');
var sig = require('oauth-signature');


module.exports = function (app, models, $http) {

    var userModel = models.userModel;
    var mediaModel = models.mediaModel;
    var tripModel = models.tripModel;
    var placeModel = models.placeModel;

    var flickrConfig = {
        consumerKey: "c778ef301f9d7fd8fb70c5dc8cfe1bf9",
        consumerSecret: "c7d4b19e14debcc7",
    }

    app.get("pro/trips/:userId", getUserTrips);

    function getUserTrips(req, res) {
        var id = req.params.userId;

        
        //tripModel



    }




};


