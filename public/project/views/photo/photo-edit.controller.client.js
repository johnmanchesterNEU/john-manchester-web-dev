(function(){
    angular
        .module("Project")
        .controller("PhotoEditController", PhotoEditController);
    function PhotoEditController($location, $routeParams, $http){
        var vm = this;
        vm.init = init;

        vm.photoEdit = photoEdit;

        vm.close = close;
        vm.photoDelete = photoDelete;


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


        function photoDelete(){
            console.log("delete");
        }

        function init(){


            /*var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
             url += "/" + photo.id + "_" + photo.secret + "_b.jpg";*/
            //  var url = "https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=9eae9e2a0a7438976a234fc16ff535fa&user_id=144248730@N03";

            $http.get("https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=9eae9e2a0a7438976a234fc16ff535fa&extras=media&user_id=144248730@N03&format=json")
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
                })



        }

        init();





    }})();