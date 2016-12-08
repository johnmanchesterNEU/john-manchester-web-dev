var flickrApi = require('flickr-oauth-and-upload');
var sig = require('oauth-signature');


module.exports = function (app, models, $http) {

    var userModel = models.userModel;
    var mediaModel = models.mediaModel;


    var flickrConfig = {
        consumerKey: "c778ef301f9d7fd8fb70c5dc8cfe1bf9",
        consumerSecret: "c7d4b19e14debcc7",
    }


    app.put("/method/photos/add", addUserPhotos);
    function addUserPhotos(req, res) {
        var photos = req.body;
        console.log(photos);
        mediaModel
            .addPhotos(photos)
            .then(function (result) {
                res.json(result);
            }, function (error) {
                res.status(400).send("Could not add photos");
            })
    }



    app.get("/user/:id/photos", getUserPhotos);

    function getUserPhotos(req, res){
      var userID = req.params.id;
        console.log(userID);
        var flickr = require("flickrapi");
        flickr.people.getPhotos({api_key: procces.env.FLICKR_CONSUMER_KEY, user_id: userId, page: 1, per_page:999},
        function (err, result) {
            if(err){
                res.statusCode(400).send("Could not retrieve photos");
            }else{
                res.send(result);
            }

        });


    }



    app.put("/method/photo/delete/:pid", deletePhoto);

    function deletePhoto(req, res) {

        console.log(req.body);
        var user = req.body;

        var photoID = req.params.pid;
        console.log(photoID);

        var args = {
            method : "flickr.photos.delete",
            flickrConsumerKey : flickrConfig.consumerKey,
            flickrConsumerKeySecret : flickrConfig.consumerSecret,
            oauthToken : user.flickr.token,
            oauthTokenSecret : user.flickr.tokenSecret,
            optionalArgs : {photo_id : photoID, format:'json', nojsoncallback: '1'}
        }
        //args.method ="flickr.photos.delete";
      //  args.oauthToken =  user.flickr.token;

        console.log(args);


        var url = flickrApi.signApiMethod(args);




        var p = {
            flickrConsumerKey : flickrConfig.consumerKey,
            format:'json',
            method : "flickr.photos.delete",
            oauthToken : user.flickr.token,
            oauthTokenSecret : user.flickr.tokenSecret,
            photo_id : photoID,
            nojsoncallback: '1'
        }




         console.log(url);
        //var req = https.request(url, function (res) {
       //     console.log(res);
      //  })




     //   var data = flickrApi.callApiMethod(args);


       // console.log("HEY");
      //  console.log(data);

        var full = "https://api.flickr.com" + url.path;
        console.log(full)
        

        //console.log(url);

       // var photoID = req.params.pid;
       // console.log(photoID);


       // var url = flickrApi.signApiMethod(args);
     //   console.log(url);
   //     return url;

    }



};


