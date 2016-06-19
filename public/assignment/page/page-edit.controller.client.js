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

        function init() {
            vm.page = PageService.findPage(vm.pid);
        }
        init();

        function close(){
            vm.success = false;
        }

        function deletePage(pid){
            var result = PageService.deletePage(pid);
            if(result) {
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/");
            } else {
                vm.error = "Unable to delete website";
            }
        }

        function updatePage(name, title) {
            var result = PageService.updatePage(vm.pid, name, title);
            if(result){
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/");
            }else{
                vm.success = true;
                vm.error = "Page did not update";
            }
        }
    }
})();