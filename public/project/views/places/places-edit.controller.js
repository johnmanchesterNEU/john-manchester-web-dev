(function(){
    angular
        .module("Project")
        .controller("PlacesEditController", PlacesEditController);

    function PlacesEditController($location, $http, $routeParams,UserService, PlacesService) {
        var vm = this;
        vm.places=[];
        vm.addPlace =addPlace;
        vm.jsonPlace = {};
        vm.setPlace = setPlace;




        var id = $routeParams["id"];



        $(function(){
            console.log("hello");
           // vm.lat = geoplugin_latitude();
           // vm.long = geoplugin_longititude();

            $.getJSON('http://ipinfo.io', function(data){
                console.log(data)
                vm.location = data.city + ", "  + data.region + ", " + data.country;
                console.log(vm.location);
                //$("#geocomplete").trigger("geocode");


                vm.area = data.loc.split(",");
                console.log(vm.area[0] + ", " + vm.area[1]);


                vm.geo = vm.area[0] + ", " + vm.area[1];


                $("#geocomplete").geocomplete({
                    map: ".map_canvas",
                    location: vm.location,
                    types: ['geocode','establishment'],
                    details: "form ",
                    markerOptions: {
                        draggable: true
                    }}
                );


            }, function (error) {
                console.log("ERROR")
                vm.location = "Boston, MA, US";
            })


            $("#geocomplete")
                .bind("geocode:result", function(event, result){
                    console.log("hey");
                    console.log(result);
                    setPlace(result);
                    vm.geo = result.geometry.location.lat() + ", " + result.geometry.location.lng();
                    console.log(vm.geo);

                });


            $("#geocomplete").bind("geocode:dragged", function(event, latLng){

                console.log(latLng);
                console.log(latLng.lat());

                geocoder = new google.maps.Geocoder();

                geocoder.geocode({
                    latLng: latLng
                }, function(responses) {
                    if (responses && responses.length > 0) {
                        console.log(responses);
                        vm.location = responses[0].formatted_address;

                        console.log(responses[0]);

                        vm.lat = responses[0].geometry.location.lat();
                        vm.lang = responses[0].geometry.location.lng();

                        console.log(vm.location);

                        vm.area = vm.lat + ", " + vm.long;
                     //   console.log(vm.lat);

                        $("#geocomplete").val(vm.location);

                        setPlace(responses[0]);


                    } else {
                        console.log("FAIL")
                        updateMarkerAddress('Cannot determine address at this location.');
                    }
                });




              //  $("#geocomplete").geocomplete("find", latLng.lat() + "," + latLng.lng());


                $("#reset").show();
                //$("#geocomplete").trigger("geocode");
            });


            $("#reset").click(function(){
                $("#geocomplete").geocomplete("resetMarker");
                $("#reset").hide();
                return false;
            });

            $("#find").click(function(){
               // console.log(results);
                $("#geocomplete").trigger("geocode");


            }).click();








        });






        function  addPlace() {
            console.log("------------ADD-----------------")
            console.log(vm.jsonPlace);
            PlacesService
                .addPlace(vm.jsonPlace)
                .then(function (success) {
                    vm.success = success;
                }, function (error) {
                    vm.error = error;
                })

        }



        // Set a place to Add
        function setPlace(place){
            console.log(place);
           place.address_components.forEach(function (value, i) {
             //   console.log(value);
             //   console.log(value.types[0]);
                var name = value.types[0];
                //s += { name : value.long_name};
                s[name] = value.long_name;
            });

             var name = (place.name)? place.name : place.formatted_address;

            console.log(name);

            vm.jsonPlace = {
                id:  place.place_id,
                name: name,
                establishment: s["establishment"],
                locality: s["locality"],
                region: s["administrative_area_level_1"],
                country : s["country"],
                long:  place.geometry.location.lng(),
                lat:  place.geometry.location.lat()
            }


            console.log("------ JSON PLACE ---------")
            console.log(vm.jsonPlace);
        }



        function initialize() {

            console.log("HEY");
            // vm.trip.places = "";
            var input = document.getElementById('places');
          //  console.log(input);
            var autocomplete = new google.maps.places.Autocomplete(input);


            autocomplete.addListener('place_changed', function (data) {
                vm.place = autocomplete.getPlace();
                //vm.places += place;
                console.log(vm.place);


                // Blindly add key value pairs so we can add them later
                var s = [];

                vm.place.address_components.forEach(function (value, i) {
                //    console.log(value);
                 //   console.log(value.types[0]);
                    var name = value.types[0];
                    //s += { name : value.long_name};
                    s[name] = value.long_name;
                });


                vm.jsonPlace = {
                    id:  vm.place.place_id,
                    name: vm.place.name,
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

        //google.maps.event.addDomListener(window, 'load', initialize);


        //function  changedPlace(data) {
        //var place = autocomplete.getPlace();
        //   console.log(data);
        // }


    }
})();