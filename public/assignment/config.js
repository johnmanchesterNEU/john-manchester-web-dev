(function () {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($sceDelegateProvider, $routeProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://www.youtube.com/**'
        ]);

        $routeProvider
            .when("/", {
                templateUrl: "views/home.html"
            })
            // User Controllers
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                title: "Login",
                controllerAs: "model",
               // resolve: {
                  //  loggedIn: checkLoggedIn
               // }
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
            .when("/profile/:id", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                title: "Profile",
                controllerAs: "model",
                resolve: {
                   loggedin: checkLoggedin
                }
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                title: "Register",
                controllerAs: "model"
            })
            //Website Controllers
            .when("/user/:userId/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                title: "Website List",
                controllerAs: "model"
            })

            .when("/user/:userId/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                title: "New Website",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                title: "Edit Website",
                controllerAs: "model"
            })


            //Page Controllers
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                title: "Page List",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page-edit/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "PageEditController",
                title: "Page Edit",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page-new/", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "PageNewController",
                title: "New Page",
                controllerAs: "model"
            })

            //Widget Controllers
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widgets/widget-chooser.view.client.html",
                controller: "WidgetChooserController",
                title: "Widget Chooser",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widgets/widget-list.view.client.html",
                controller: "WidgetListController",
                title: "Widget List",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widgets/widget-edit.view.client.html",
                controller: "WidgetEditController",
                title: "Widget Edit",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new/:type", {
                templateUrl: "views/widgets/widget-new.view.client.html",
                controller: "WidgetNewController",
                title: "Widget Chooser",
                controllerAs: "model"
            })
            .when("/flickr/:uid/website/:wid/page/:pid", {
                templateUrl: "views/widgets/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                title: "Flickr Search",
                controllerAs: "model"
            })
            .when("/flickr/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widgets/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                title: "Flickr Search",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
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
                            $location.url("/login")
                        } else {
                            deferred.resolve();
                            $rootScope.currentUser = user;
                            //console.log("eee " + response.data)
                            //res.render();
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

    }
})();