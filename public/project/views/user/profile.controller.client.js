(function(){
    angular
        .module("Project")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;

        vm.logout = logout;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.submitted = false;
        vm.flickr = false;

        var id = $routeParams["id"];
        var index = -1;

        vm.close = close;

        vm.unlink = unlink;
        vm.refresh = refresh;
        vm.unregister = unregister;
        vm.unflickr = unflickr;

        vm.updateUser = updateUser;


        //updates all fields except username
        function updateUser() {
            console.log("HEY");
            console.log(vm.user);
            UserService
                .updateUser(id, vm.user)
                .then(
                    function(response) {
                        console.log(response);
                        vm.success = "User successfully updated";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }





        // unregister flickr
        function unflickr(){
            var profile = vm.user;

            profile.flickr = null;

            console.log(profile);
            UserService
                .updateFlickr(id, profile)
                .then(
                    function(response) {
                        //console.log("response: " + response.data.user);
                        //vm.user = response.data.user;
                        vm.user.flickr = null;
                        vm.success = "Flickr Unlinked";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )
        }




        // unregister user
        function unregister(){
            UserService.unregister(id).then(function(success){
                $location.url("/home/")
            },function(error){
                vm.error = error.data;
            })
        }



        //unlick flickr account
        function unlink(){

        }



        //refresh flickr token
        function refresh(){};


        function close(){
            vm.success = false;
        }


        function logout(){
           /* UserService
                .logout()
                .then(
                    function(response){
                        $location.url("/login");
                    },
                    function (err) {
                        $location.url("/login");
                    }
                )*/
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
          /*  UserService
                .deleteUser(id)
                .then(
                    function(response) {
                        $location.url("/login");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );*/
        }

        //updates all fields except username
        function updateUser() {
          /*  UserService
                .updateUser(id, vm.user)
                .then(
                    function(response) {
                        vm.success = "User successfully updated";
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                )*/
        }
    }
})();