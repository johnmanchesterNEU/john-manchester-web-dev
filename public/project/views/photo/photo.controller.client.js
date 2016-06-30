(function () {
    angular
        .module("Project")
        .controller("PhotoController", PhotoController).directive("owlCarousel", function() {
        return {
            restrict: 'E',
            transclude: false,
            link: function (scope) {
                scope.initCarousel = function(element) {
                    // provide any default options you want
                    var defaultOptions = {
                    };
                    var customOptions = scope.$eval($(element).attr('data-options'));
                    // combine the two options objects
                    for(var key in customOptions) {
                        defaultOptions[key] = customOptions[key];
                    }
                    // init carousel
                    $(element).owlCarousel(defaultOptions);
                };
            }
        };
    })
        .directive('owlCarouselItem', [function() {
            return {
                restrict: 'A',
                transclude: false,
                link: function(scope, element) {
                    // wait for the last item in the ng-repeat then call init
                    if(scope.$last) {
                        scope.initCarousel(element.parent());
                    }
                }
            };
        }]);
    function PhotoController($scope, $location, $anchorScroll, $window, $http) {

        var vm = this;

        //$scope.items1 = [1,2,3,4,5];
        //$scope.items2 = [1,2,3,4,5,6,7,8,9,10];
       /* vm.init = init;
        vm.photos = null;
        vm.jphotos = null;

        vm.next = next;
        vm.prev = prev;
        vm.smoothScroll = smoothScroll;*/

        vm.init = init;

        

        function init(){


            /*var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
             url += "/" + photo.id + "_" + photo.secret + "_b.jpg";*/
          //  var url =https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a1bf2c7f3eb788b3312e1a639e324929&user_id=144248730%40N03&format=rest

            $http.get("https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=c778ef301f9d7fd8fb70c5dc8cfe1bf9&extras=media&user_id=144248730@N03&format=json&nojsoncallback=1")
                .then(function(response){
                    console.log(response.data);

                  //  data = response.data.replace("jsonFlickrApi(","");
                  //  data = data.substring(0,data.length - 1);
                    data = response.data;
                    console.log(data);
                    vm.jphotos = data;

                    vm.photos = vm.jphotos.photos.photo;
                  //  console.log(vm.photos[0]);

                    //$scope.items1 = vm.photos;

                },function(error){
                    console.log(error);
                })



        }

        init();



    }}
)();