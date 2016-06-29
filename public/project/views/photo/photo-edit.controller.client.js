(function(){
    angular
        .module("Project")
        .controller("PhotoEditController", PhotoEditController);
    function PhotoEditController($location, $routeParams, $http, $routeParams, UserService, PhotoService){
        var vm = this;
        vm.init = init;

        var id = $routeParams["id"];

        vm.photoEdit = photoEdit;

        vm.close = close;
        vm.photoDelete = photoDelete;

        var secret = "c7d4b19e14debcc7";
        var token = "72157670200919646-9ea0dd9b1b3e3ba4";
        var fid = "144248730@N03";
        var apisig = "5103f617b79c3b3b2d6ca70b9b37239b";

        var key = "c778ef301f9d7fd8fb70c5dc8cfe1bf9";

        function close(index){
            //var id = "#menu"+index;
            $("#menu"+index).hide();
            $("#c"+index).hide();
        }


        function photoEdit(index){
            console.log(index);
            //var id = "#menu"+index;
            $("#menu"+index).show();
            $("#c"+index).show();
        }


        function photoDelete(photoId){

            PhotoService
                .deletePhoto(photoId, vm.user)
                .then(function (response) {
                    console.log(response);
                }, function (error) {
                    console.log(error);
                })
            

            /*
            var par = "formatjsonnojsoncallback1methodflickr.photos.delete";
            var source = secret + "api_key" + "c778ef301f9d7fd8fb70c5dc8cfe1bf9" +  "auth_token" + vm.user.flickr.token+ "photo_id" + id + par;

            var sig = $().crypt({method:"md5",source:source});


            console.log(id);

            console.log(vm.user.flickr.token);


            //console.log(process.env.FLICKR_CONSUMER_KEY);
            console.log(sig);
            console.log("delete");
            console.log(id);
           // var token  = "72157670324994335-04393b954e5515de";
            var key =  "4f6d1b92ad1230b34eff886862483510";
            var url = "https://api.flickr.com/services/rest/?method=flickr.photos.delete&api_key=" + "c778ef301f9d7fd8fb70c5dc8cfe1bf9";
            url += "&photo_id=" + id;
            url += "+&format=json&nojsoncallback=1&auth_token=" + vm.user.flickr.token;

            console.log(url);

            $http
                .get(url)
                .then(function (response) {
                    console.log(response.data);
                },function (error) {
                console.log(error);
            })

           // "https://api.flickr.com/services/rest/?method=flickr.photos.delete&api_key=4f6d1b92ad1230b34eff886862483510&photo_id=27274422873+&format=rest&auth_token=72157670324994335-04393b954e5515de&api_sig=3289465a3bc3dd525a578a832972d99e"

*/
        }

        function init(){

            UserService
                .findUserById(id)
                .then(function(response) {
                    vm.user = response.data;

                    console.log(vm.user.flickr)
                    console.log(vm.user.flickr.id);

                    PhotoService
                        .getPhotosUser(vm.user)
                        .then(function (response) {

                            data = response.data.replace("jsonFlickrApi(","");
                            data = data.substring(0,data.length - 1);
                            data = JSON.parse(data);
                            vm.jphotos = data;
                            console.log(vm.jphotos);

                            vm.photos = vm.jphotos.photos.photo;
                            console.log(vm.photos[0]);
                        }, function (error) {
                            vm.error = error;
                        })





                    PhotoService
                        .getPhotosUser2(vm.user)
                        .then(function (response) {

                           var data2 = response.data.replace("jsonFlickrApi(","");
                            data2 = data.substring(0,data.length - 1);
                            data2 = JSON.parse(data);
                            //vm.jphotos = data;
                            console.log(data2);

                           // vm.photos = vm.jphotos.photos.photo;
                           // console.log(vm.photos[0]);
                        }, function (error) {
                            vm.error = error;
                        })



                    /*  $http.get("https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key="+process.env.FLICKR_CONSUMER_KEY+"&extras=media&user_id="+vm.user.flickr.id+"&format=json")
                          .then(function(response){
                              console.log(response);

                              data = response.data.replace("jsonFlickrApi(","");
                              data = data.substring(0,data.length - 1);
                              data = JSON.parse(data);
                              vm.jphotos = data;
                              console.log(vm.jphotos);

                              vm.photos = vm.jphotos.photos.photo;
                              console.log(vm.photos[0]);

                              //$scope.items1 = vm.photos;

                          },function(error){
                              console.log(error);
                          })*/






                }, function(error){
                    vm.error = error;
                });

            /*var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
             url += "/" + photo.id + "_" + photo.secret + "_b.jpg";*/
            //  var url = "https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=9eae9e2a0a7438976a234fc16ff535fa&user_id=144248730@N03";


        }

        init();





    }})();