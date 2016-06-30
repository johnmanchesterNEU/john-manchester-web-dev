(function () {
    angular
        .module("Project")
        .controller("PhotoChooseController", PhotoChooseController).directive("owlCarousel", function () {
        return {
            restrict: 'E',
            transclude: false,
            link: function (scope) {
                scope.initCarousel = function (element) {
                    // provide any default options you want
                    var defaultOptions = {};
                    var customOptions = scope.$eval($(element).attr('data-options'));
                    // combine the two options objects
                    for (var key in customOptions) {
                        defaultOptions[key] = customOptions[key];
                    }
                    // init carousel
                    $(element).owlCarousel(defaultOptions);
                };
            }
        };
    })
        .directive('owlCarouselItem', [function () {
            return {
                restrict: 'A',
                transclude: false,
                link: function (scope, element) {
                    // wait for the last item in the ng-repeat then call init
                    if (scope.$last) {
                        scope.initCarousel(element.parent());
                    }
                }
            };
        }]);
    function PhotoChooseController($q, $scope, $location, $anchorScroll, $window, $http, $routeParams, UserService, PhotoService) {

        var vm = this;
        vm.selected = [];
        vm.selectPhoto = selectPhoto;




        // Gets all necessary information from flickr to send to database
        function getInfo(photoId) {
          return   PhotoService
                .getInfo(vm.user, photoId)
                .then(function (result) {
                        if (result.data.stat == "ok") {
                            var data = result.data.photo;
                           var info = {
                                photoid : photoId,
                                title: data.title._content,
                                description: data.description._content,
                                datetaken: data.dates.taken,
                                media: data.media
                            }
                            if (data.video) {
                                info.duration = data.video.duration;
                            }

                            console.log(info);
                            return info;
                            //getGeo(info);

                        }else{
                            //getGeo(info);
                            return info;
                        }
                        //console.log(vm.info);

                    }, function (error) {
                        console.log(error);
                    }
                )}

        function getGeo(photoId) {
           return  PhotoService
                .getGeo(vm.user, photoId)
                .then(function (result) {
                    var data = result.data;
                    //console.log(data.photo.location.place_id);
                    if (data.stat == "ok") {
                        var info = {};
                        info.fid = data.photo.location.place_id;
                        info.lat = data.photo.location.latitude;
                        info.lng = data.photo.location.longitude;
                        info.city = data.photo.location.locality._content;
                        info.county = data.photo.location.county._content;
                        info.region = data.photo.location.region._content;
                        info.country = data.photo.location.country._content;
                        console.log(info);
                        return info;
                       // getSize(info);

                        /*return {
                            fid: data.photo.location.place_id,
                            lat: data.photo.location.latitude,
                            lng:  data.photo.location.longitude,
                        city: data.photo.location.locality._content,
                        county: data.photo.location.county._content,
                        region: data.photo.location.region._content,
                        country:data.photo.location.country._content
                        }*/
                        /*vm.info.fid = data.photo.location.place_id;
                        vm.info.lat = data.photo.location.latitude;
                        vm.info.lng = data.photo.location.longitude;
                        vm.info.city = data.photo.location.locality._content;
                        vm.info.county = data.photo.location.county._content;
                        vm.info.region = data.photo.location.region._content;
                        vm.info.country = data.photo.location.country._content;*/
                    }else{
                        return info;
                     //   getSize(info);
                    }
                    //console.log(vm.info);

                  //  getSize(photoId);

                }, function (error) {
                    console.log(error);
                })

        }

        function getSize(photoId) {
            return PhotoService.getSize(vm.user, photoId)
                .then(function (result) {
                    var data = result.data;
                   // console.log(data);

                    origIndex = data.sizes.size.length - 1;
                   // console.log(origIndex);
                  //  console.log(data.sizes.size[origIndex]);
                    if (data.stat == "ok") {
                        var sizes = data.sizes.size[origIndex];
                      //return   {
                        //   width:  sizes.width,
                        //   height: sizes.height
                      // }
                        var info = {}
                        info.size = sizes.width;
                        info.height = sizes.height;
                        // vm.info.width = sizes.width;
                       // vm.info.height = sizes.height;
                        console.log(info);
                        return info;
                    }
                    else{
                        return  info;//{};
                    }

                    //console.log(vm.info);
                }, function (error) {
                     console.log(error);
                })

        }


        function selectPhoto(index) {
            var ok = "#ok" + index;
            $(ok).show();
            console.log(vm.photos[index]);
        //    var finalObj = {};



            var photoin = indexOf(vm.photos[index].id, vm.selected);

            console.log(photoin);

            if (photoin != -1) {
                vm.selected.splice(photoin, 1);
                $(ok).hide();
            } else {

                Promise.all([getInfo(vm.photos[index].id), getGeo(vm.photos[index].id), getSize(vm.photos[index].id)]).then(function(data) {
                    console.log(data);
                   var finalObj =$.extend({}, data[0], data[1], data[2]);
                    console.log(finalObj);

                    vm.selected.push(finalObj);
                    console.log(vm.selected)

                }, function(error) {
                    console.log(error);
                    // one or more failed
                });


            }
        }


        function indexOf(id, photos) {
            //var hey = false;
            for (var i = 0; photos.length > i; i += 1) {
                if (photos[i].id === id) {
                    return i;
                }
            }

            return -1;
        }


        //$scope.items1 = [1,2,3,4,5];
        //$scope.items2 = [1,2,3,4,5,6,7,8,9,10];
        /* vm.init = init;
         vm.photos = null;
         vm.jphotos = null;

         vm.next = next;
         vm.prev = prev;
         vm.smoothScroll = smoothScroll;*/

        vm.init = init;

        var id = $routeParams["id"];


        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;

                    console.log(vm.user.flickr)
                    console.log(vm.user.flickr.id);

                    if (vm.user.flickr.id) {
                        PhotoService
                            .getPhotosUser(vm.user)
                            .then(function (response) {

                                data = response.data;
                                vm.jphotos = data;
                                console.log(vm.jphotos);

                                vm.photos = vm.jphotos.photos.photo;
                                console.log(vm.photos[0]);
                            }, function (error) {
                                vm.error = error;
                            })

                    }
                }, function (error) {
                    vm.error = error;
                });

            /*var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
             url += "/" + photo.id + "_" + photo.secret + "_b.jpg";*/
            //  var url = "https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=9eae9e2a0a7438976a234fc16ff535fa&user_id=144248730@N03";


        }

        init();


    }
})();