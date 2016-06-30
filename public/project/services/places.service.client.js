(function(){
    angular
        .module("Project")
        .factory("PlacesService", PlacesService);

    function PlacesService($http) {


        var api = {
           addPlace:addPlace,
            getPlaces:getPlaces
        };
        return api;


        function addPlace(place){
            //console.log(flickrConfig);

           return $http.put("/pro/place", place);

        }



        function getPlaces(){
            //console.log(flickrConfig);

           return $http.get("/pro/places");

        }


    }})();