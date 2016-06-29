(function(){
    angular
        .module("Project")
        .controller("TestController", TestController);

    function TestController($location, $http, TestService) {


        var vm = this;


        function test() {
            var check = {
                method: "flickr.test.login",
                flickrConsumerKey: "dc29c800c34e2955c179219f36bc7d83",
                oauthToken: "72157670260571446-7dd181a8bae384b5",
                optionalArgs: {format: "json" , nojsoncallback : 1}
            }

            TestService.checklogin(check)


            console.log(vm);
        }

        
    }
})();