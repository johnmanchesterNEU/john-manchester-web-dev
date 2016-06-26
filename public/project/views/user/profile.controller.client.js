(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;

        vm.logout = logout;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.submitted = false;

        var id = $routeParams["id"];
        var index = -1;


        function logout(){
            UserService
                .logout()
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function (err) {
                        $location.url("/login");
                    }
                )
        }




        function init() {
            UserService
                .findUserById(id)
                .then(function(response) {
                    vm.user = response.data;
                });
        }
        init();

        //deletes user from Users
        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

        //updates all fields except username
        function updateUser() {
            UserService
                .updateUser(id, vm.user)
                .then(
                    function(response) {
                        vm.success = "User successfully updated";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }
    }
})();