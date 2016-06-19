(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.init = init;

        function init() {
            vm.pages = PageService.findPages(vm.wid);
        }
        init();

    }
})();