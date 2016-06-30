module.exports = function (app, models) {

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
    }
        //tripModel


        app.get("/pro/places", getPlaces);

        function getPlaces(req, res){
            return placeModel
                .getPlaces()
                .then(function (results) {
                    console.log(results)
                    res.json(results);
                },function (error) {
                    res.status(400).send("Can not get places");
                })

                }



};