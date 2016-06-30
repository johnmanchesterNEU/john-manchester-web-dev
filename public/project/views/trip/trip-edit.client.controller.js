(function(){
    angular
        .module("Project")
        .controller("TripEditController", TripEditController);

    function TripEditController($location, TripService, $routeParams) {

        var vm = this;
        vm.places=[];
        vm.addPlace =addPlace;
        vm.removePlace = removePlace;
        //vm.trip.places="";
        vm.addTrip = addTrip;



        var id = $routeParams["id"];



        function addTrip(){
            console.log(vm.trip);
         //   TripService
           //     .addTrip(id, vm.trip)
            //    .then(function (success) {
                    
                    
              //  }, function (error) {
                    
              //  })
        }




        function init(){
           // TripService
              //  .tripsforUser(id)
               // .then(function (success) {
               //    vm.myTrips = success.data;
               // }, function (error) {
               //     vm.error = error.data;
               // })
        }

        init();


        function removePlace(index){
            console.log(index);
            vm.places.splice(index,1);
        }


        function  addPlace() {
            // You can only add a place once
            if(unique4(vm.jsonPlace.id, vm.places)){
            vm.places.push(vm.jsonPlace);
                vm.trip.places = "";
            }
        }


        function unique4(id, places){
            //var hey = false;
                for (var i = 0; places.length > i; i += 1) {
                    if (places[i].id === id) {
                        return false;
                    }
                }

                return true;
        }








        function initialize() {

           // vm.trip.places = "";
            var input = document.getElementById('places');
            console.log(input);
            var autocomplete = new google.maps.places.Autocomplete(input);


            autocomplete.addListener('place_changed', function (data) {
                vm.place = autocomplete.getPlace();
                //vm.places += place;
                console.log(vm.place);


                // Blindly add key value pairs so we can add them later
                var s = [];

                vm.place.address_components.forEach(function (value, i) {
                    console.log(value);
                    console.log(value.types[0]);
                    var name = value.types[0];
                    //s += { name : value.long_name};
                    s[name] = value.long_name;
                });


               vm.jsonPlace = {
                    id:  vm.place.place_id,
                    name: vm.place.name,
                   establishment: s["establishment"],
                    locality: s["locality"],
                    region: s["administrative_area_level_1"],
                    country : s["country"],
                    long:  vm.place.geometry.location.lng(),
                    lat:  vm.place.geometry.location.lat()
                }


                console.log(vm.jsonPlace);
                //vm.places.push(vm.jsonPlace);
                //vm.trip.places = "";
            });
        }

        google.maps.event.addDomListener(window, 'load', initialize);


        //function  changedPlace(data) {
            //var place = autocomplete.getPlace();
         //   console.log(data);
       // }
        

    }
})();/**
 * Created by John on 6/28/2016.
 */
