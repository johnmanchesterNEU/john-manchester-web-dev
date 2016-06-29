var flickrApi = require('flickr-oauth-and-upload');
var sig = require('oauth-signature');

module.exports = function (app, models, $http) {

    var userModel = models.userModel;
    var mediaModel = models.mediaModel;
    var placeModel = models.placeModel;

    app.put("/pro/place", addPlace);

    function addPlace(req, res) {
        var place = req.body;
        console.log(place);

        placeModel
            .createPlace(place)
            .then(function (success) {
                console.log("INSERTED");
                console.log(success);
                res.status(200).send('Place is added');
            }, function (error) {
                console.log(error);
                res.status(400).send("Place could not be added");
            })

        //tripModel



    }


};