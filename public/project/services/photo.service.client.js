(function(){
    angular
        .module("Project")
        .factory("PhotoService", PhotoService);

    function PhotoService($http) {


        var api = {
            getPhotosUser:getPhotosUser,
            getPhotosUser2:getPhotosUser2,
            deletePhoto:deletePhoto
        };
        return api;

        function  deletePhoto(photo, user) {

            console.log("DELETE")
             console.log(photo);
            console.log(user);

            var url = "/method/photo/delete/"+photo;

            return $http.put(url, user);
           /* var args ={
                method : "flickr.photos.delete",
                flickrConsumerKey : "c778ef301f9d7fd8fb70c5dc8cfe1bf9",
                flickrConsumerKeySecret : "c7d4b19e14debcc7",
                oauthToken : user.flickr.token

            }


            var url = flickrApi.signApiMethod(args);
            console.log(url);
            url += "https://api.flickr.com/" + url;
            console.log(url);



            //return $http.get(*/


        }


        
        function getPhotosUser(user){
            //console.log(flickrConfig);

            var key = "c778ef301f9d7fd8fb70c5dc8cfe1bf9"


            console.log(user.flickr.id)
            return $http.get("https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key="
                +key+"&extras=media&user_id="+user.flickr.id+"&format=json")

        }



        function getPhotosUser2(user){
            //console.log(flickrConfig);

            $http.get("/user/"+ user.flickr.id+ "/photos")

        }


    }})();