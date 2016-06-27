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
            .when("/country", {
                templateUrl: "views/user/country.html",
                controller: "AutoComplete",
                title: "Country",
                controllerAs: "model"
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
            .when("/photoedit",{
            templateUrl: "views/photo/photo-edit.view.client.html",
            controller: "PhotoEditController",
            title: "Photo Edit",
            controllerAs: "model"
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
            
            .when("/horiz",{
                templateUrl: "views/user/horiz.html",
                title: "Login",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "views/user/register.view.client.html"
            });

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