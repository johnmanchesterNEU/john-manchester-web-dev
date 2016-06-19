(function () {
    angular.module("ToDos", ["MyDirectives"])
        .controller("TodoController", TodoController);

    function TodoController($http) {
        var vm = this;

        $http.get("todo.server.js");
    }

})();