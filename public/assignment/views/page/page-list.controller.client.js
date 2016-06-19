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
            PageService
                .findAllPagesForWebsite(vm.wid)
                .then(function(response) {
                    vm.pages = response.data;
                });
            //vm.pages = PageService.findPages(vm.wid);
        }
        init();

    }
})();