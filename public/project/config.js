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
                title: "Login",
                controllerAs: "model"
            })
            .when("/photoupload",{
                templateUrl: "views/photo/photoupload.view.client.html",
                controller: "PhotoUploadController",
                title: "Login",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                title: "Login",
                controllerAs: "model"
            })
            
            .when("/horiz",{
                templateUrl: "views/user/horiz.html",
                title: "Login",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "views/user/register.view.client.html"
            });

       // $locationProvider.html5Mode(true);
       // $locationProvider.hashPrefix('!');
    }
})();