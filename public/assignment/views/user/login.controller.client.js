(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location,$rootScope, UserService) {

        var vm = this;

        vm.login = login;
        vm.close = close;



        function close(){
            vm.error=false;
        }

       function login(isValid) {
           
           //console.log(vm.user);
           //console.log(vm.user.username);
           //console.log(vm.user.password);
           if(isValid){
               UserService
                   .login(vm.user)
                   .then(
                       function(response) {
                           var user = response.data;
                           console.log(response);

                           if(user._id) {
                               console.log("HOORAY");
                               var user = response.data;
                               $rootScope.currentUser = user;
                               $location.url("/profile/" + user._id);
                           } else {
                               console.log("NO!")
                               vm.error = "Not Authorized";
                           }



                       }, function(error){
                           vm.error = "Not Authorized";
                       })
            /*UserService
                .login(vm.user.username, vm.user.password)
                .then(function(response){
                    console.log(response);
                    var user = response.data;
                    console.log(response.data);
                    if(user) {
                        console.log("HOORAY")
                        $location.url("/profile/" + user._id);
                    } else {
                        vm.error = "User not found";
                    }
                });*/
           }
       }
        
    }
})();