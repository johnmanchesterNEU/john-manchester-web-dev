(function () {
    angular
        .module("Project")
        .controller("PlacesEditController", PlacesEditController);

    function PlacesEditController($location, $http, $routeParams, PlacesService) {
        var vm = this;
        vm.places = [];
        vm.addPlace = addPlace;
        vm.jsonPlace = {};
        vm.setPlace = setPlace;


        var id = $routeParams["id"];


        function loadDefault() {
            $.getJSON('http://ipinfo.io', function (data) {
                console.log(data)
                vm.location = data.city + ", " + data.region + ", " + data.country;
                console.log(vm.location);

                vm.area = data.loc.split(",");
                console.log(vm.area[0] + ", " + vm.area[1]);


                vm.geo = vm.area[0] + ", " + vm.area[1];


                return {
                    map: ".map_canvas",
                    location: vm.location,
                    types: ['geocode', 'establishment'],
                    markerOptions: {
                        draggable: true
                    }
                }


            }, function (error) {
                return {
                    map: ".map_canvas",
                    location: "Boston, MA, USA",
                    types: ['geocode', 'establishment'],
                    details: "form ",
                    markerOptions: {
                        draggable: true
                    }
                }
            })
        }


        function init() {
            console.log("init");
            $("#test").geocomplete()
                .bind("geocode:result", function (event, result) {
                    $.log("Result: " + result.formatted_address);
                })
        }

        init();


        $(function () {

            $.getJSON('http://ipinfo.io', function (data) {
                console.log(data)
                vm.location = data.city + ", " + data.region + ", " + data.country;
                console.log(vm.location);

                vm.area = data.loc.split(",");
                console.log(vm.area[0] + ", " + vm.area[1]);


                vm.geo = vm.area[0] + ", " + vm.area[1];


                vm.options = {
                    map: ".map_canvas",
                    location: vm.location,
                    types: ['geocode', 'establishment'],
                    markerOptions: {
                        draggable: true
                    }
                }


                $("#geocomplete").geocomplete(vm.options);


            }, function (error) {
                vm.options = {
                    map: ".map_canvas",
                    location: "Boston, MA, USA",
                    types: ['geocode', 'establishment'],
                    details: "form ",
                    markerOptions: {
                        draggable: true
                    }
                }
                $("#geocomplete").geocomplete(vm.options);
            })


            $("#geocomplete")
                .bind("geocode:result", function (event, result) {
                    console.log(result);
                    setPlace(result);
                });


            $("#geocomplete").bind("geocode:dragged", function (event, latLng) {

                console.log(latLng);
                console.log(latLng.lat());

                geocoder = new google.maps.Geocoder();

                geocoder.geocode({
                    latLng: latLng
                }, function (responses) {
                    if (responses && responses.length > 0) {
                        console.log(responses);
                        vm.location = responses[0].formatted_address;
                        setPlace(responses[0]);

                        $("#geocomplete").val(vm.location);

                    } else {
                        console.log("FAIL")
                        updateMarkerAddress('Cannot determine address at this location.');
                    }
                });


                $("#geocomplete")
                    .geocomplete()
                    .bind("geocode:result", function (event, result) {
                        console.log(result);
                    });


                $("#reset").show();
                //$("#geocomplete").trigger("geocode");
            });


            $("#reset").click(function () {
                $("#geocomplete").geocomplete("resetMarker");
                $("#reset").hide();
                return false;
            });

            $("#find").click(function () {
                // console.log(results);
                $("#geocomplete").trigger("geocode");

            }).click();


            $("#submit").click(function () {
                 console.log(vm.jsonPlace);
                PlacesService
                    .addPlace(vm.jsonPlace)
                    .then(function (results) {
                        console.log(results);
                    }, function (error) {
                        console.log(error);
                    })
            })


        });


        function addPlace() {
            // console.log(vm.jsonPlace);
            PlacesService
                .addPlace(vm.jsonPlace)
                .then(function (results) {
                    console.log(results);
                }, function (error) {
                    console.log(error);
                })

        }


        // Set a place to Add
        function setPlace(place) {
            console.log(place);
            place.address_components.forEach(function (value, i) {
                //   console.log(value);
                //   console.log(value.types[0]);
                var name = value.types[0];
                //s += { name : value.long_name};
                s[name] = value.long_name;
            });

            var name = (place.name) ? place.name : place.formatted_address;

            console.log(name);

            vm.jsonPlace = {
                id: place.place_id,
                name: name,
                establishment: s["establishment"],
                locality: s["locality"],
                region: s["administrative_area_level_1"],
                country: s["country"],
                long: place.geometry.location.lng(),
                lat: place.geometry.location.lat()
            }


            console.log("------ JSON PLACE ---------")
            console.log(vm.jsonPlace);
        }


    }
})();