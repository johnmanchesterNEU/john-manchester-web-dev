(function(){
    angular
        .module("Project")
        .factory("TestService", TestService);

    function TestService($http) {
        var api = {
        };
        return api;
    }
})();
