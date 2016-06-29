/**
 * Created by John on 6/27/2016.
 */
(function () {
    angular
        .module("Project")
        .controller("UsersController", UsersController);
    function UsersController($scope, $location, $anchorScroll, $window, $http, UserService, $routeParams, $rootScope) {

        var vm = this;
        var id = $routeParams["id"];
        vm.follow = follow;
        
        
        function  follow(userId) {
            console.log(userId);
            console.log(id);

            console.log($rootScope.currentUser);
            var follower = {
                id : id,
                follow: userId
            };


            console.log(follower);
           UserService
               .followMe(follower)
                .then(function (success) {
                    vm.success = success;
                },function (error) {
                    vm.error = error;
                })
        }


        function init() {
            console.log("init");
            console.log($rootScope.currentUser);
            UserService
                .getUsers()
                .then(function (users) {
                    console.log("returned");
                    console.log(users.data);
                    vm.users = users.data;
                }, function(error){
                    console.log("error");
                    console.log(error);
                    vm.error = error;
                })

        }
        init();
    }})();