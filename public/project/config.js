(function () {
    angular
        .module("Project")
        .config(Config);

    function Config($sceDelegateProvider, $routeProvider, $locationProvider, $mdThemingProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://www.youtube.com/**'
        ]);

        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                title: "Home",
                controllerAs: "model"
            })
            .when("/trip", {
                templateUrl: "views/trip/trip.view.client.html",
                controller: "TripController",
                title: "Home",
                controllerAs: "model"
            })
            .when("/tripedit", {
                templateUrl: "views/trip/trip-edit.view.client.html",
                controller: "TripEditController",
                title: "Home",
                controllerAs: "model"
            })
            .when("/places", {
                templateUrl: "views/places/places.view.client.html",
                controller: "PlacesController",
                title: "Home",
                controllerAs: "model"
            })
            .when("/placesedit/:id", {
                templateUrl: "views/places/places-edit.view.client.html",
                controller: "PlacesEditController",
                title: "Home",
                controllerAs: "model",
                resolve: {loggedin: checkPlaces}
            })
            .when("/placesedit", {
                templateUrl: "views/places/places-edit.view.client.html",
                controller: "PlacesEditController",
                title: "Home",
                controllerAs: "model",
                resolve: {loggedin: checkPlaces}
            })
            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                title: "Home",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                title: "Register",
                controllerAs: "model"
            })
            .when("/users", {
                templateUrl: "views/user/users.view.client.html",
                controller: "UsersController",
                title: "Users",
                controllerAs: "model",
                resolve: {
                    checkUsers: checkUsers
                }
            })
            .when("/users/:id", {
                templateUrl: "views/user/users.view.client.html",
                controller: "UsersController",
                title: "Users",
                controllerAs: "model",
                resolve: {
                    checkUsers: checkUsers
                }
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                title: "Login",
                controllerAs: "model"
            })
            .when("/photo",{
                templateUrl: "views/photo/photo.view.client.html",
                controller: "PhotoController",
                title: "Photo",
                controllerAs: "model"
            })
            .when("/photoedit/:id",{
                templateUrl: "views/photo/photo-edit.view.client.html",
                controller: "PhotoEditController",
                title: "Photo Edit",
                controllerAs: "model",
                resolve: {
                    loggedin: checkEdit
                }
            })
            .when("/photoedit",{
            templateUrl: "views/photo/photo-edit.view.client.html",
            controller: "PhotoEditController",
            title: "Photo Edit",
            controllerAs: "model",
                resolve: {
                    loggedin: checkEdit
                }
        })
            .when("/photoupload",{
                templateUrl: "views/photo/photoupload.view.client.html",
                controller: "PhotoUploadController",
                title: "Login",
                controllerAs: "model"
            })

            .when("/profile/", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                title: "Profile",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/profile/:id",{
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                title: "Login",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })

            .otherwise({
                redirectTo: "views/user/register.view.client.html"
            });



        function checkPlaces(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        console.log(user);
                        if(!user) {
                            console.log(user._id)
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/register/")
                        } else {
                            deferred.resolve();
                            $rootScope.currentUser = user;
                            //console.log("eee " + response.data)
                            //res.render();
                            console.log(user.local.username);
                            $location.url("/placesedit/" + user._id);

                        }
                    },
                    function(err) {
                        console.log(err);
                        $rootScope.currentUser = null;
                        deferred.reject();
                    }
                );

            return deferred.promise;
        }


        function checkEdit(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        console.log(user);
                        if(!user) {
                            console.log(user._id)
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/register/")
                        } else {
                            deferred.resolve();
                            $rootScope.currentUser = user;
                            //console.log("eee " + response.data)
                            //res.render();
                            console.log(user.local.username);
                            $location.url("/photoedit/" + user._id);

                        }
                    },
                    function(err) {
                        console.log(err);
                        $rootScope.currentUser = null;
                        deferred.reject();
                    }
                );

            return deferred.promise;
        }

        function checkUsers(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        console.log(user);
                        if(!user) {
                            console.log(user._id)
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/register/")
                        } else {
                            deferred.resolve();
                            $rootScope.currentUser = user;
                            //console.log("eee " + response.data)
                            //res.render();
                            console.log(user.local.username);
                            $location.url("/users/" + user._id);

                        }
                    },
                    function(err) {
                        console.log(err);
                        $rootScope.currentUser = null;
                        deferred.reject();
                    }
                );

            return deferred.promise;
        }



        function checkLoggedin(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        console.log(user);
                        if(!user) {
                            console.log(user._id)
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location.url("/register/")
                        } else {
                            deferred.resolve();
                            $rootScope.currentUser = user;
                            //console.log("eee " + response.data)
                            //res.render();
                            console.log(user.local.username);
                            $location.url("/profile/" + user._id);

                        }
                    },
                    function(err) {
                        console.log(err);
                        $rootScope.currentUser = null;
                        deferred.reject();
                    }
                );

            return deferred.promise;
        }


        // $locationProvider.html5Mode(true);
       // $locationProvider.hashPrefix('!');
    }
})();