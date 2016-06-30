(function(){
    angular
        .module("Project")
        .controller("PlacesController", PlacesController);

    function PlacesController($location, $http, PlacesService) {


        var vm = this;
        
        
        function  init() {
            PlacesService
              .getPlaces()
              .then(function (result) {
                  vm.places  = result.data;
                  console.log(result.data);

              }, function (error) {
                  vm.error = error;

              })
        }
        init();


    }
})();