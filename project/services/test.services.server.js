var flickrApi = require('flickr-oauth-and-upload');
var sig = require('oauth-signature');

module.exports = function (app, models, $http) {

    var userModel = models.userModel;
    var mediaModel = models.mediaModel;


    var flickrConfig = {
        consumerKey: "c778ef301f9d7fd8fb70c5dc8cfe1bf9",
        consumerSecret: "c7d4b19e14debcc7",
    }


    app.put("/checklogin/:pid", checkLogin);

    function checkLogin(req, res) {

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


