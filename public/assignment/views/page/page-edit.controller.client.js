(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.init = init;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.close = close;
        vm.submitted = false;

        function init() {
            PageService
                .findPageById(vm.pid)
                .then(function (response) {
                    vm.page = response.data;
                });
        }

        init();

        function close() {
            vm.success = false;
        }

        function deletePage(pid) {
            PageService
                .deletePage(vm.pid)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
                    },
                    function (error) {
                        vm.error = error.data;
                        vm.success = true;
                    }
                )

        }

        function updatePage(isValid) {
            vm.submitted = true;
            if(isValid){
            PageService
                .updatePage(vm.pid, vm.page)
                .then(
                    function (response) {
                        // vm.success = "Page successfully updated";
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                )}
        }
    }
})();