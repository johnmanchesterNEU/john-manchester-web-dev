(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.createPage = createPage;
        vm.close = close;
        vm.submitted = false;

        function createPage(isValid) {
           // console.log(vm.wid);
            //console.log(vm.page);
            console.log(isValid);
            vm.submitted = true;
            console.log(vm.submitted);
            if(isValid){
            PageService
                .createPage(vm.wid, vm.page)
                .then(
                    function(response) {
                        //alert(response.data);
                        console.log(response.data)
                        $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                    },
                    function(error) {
                        vm.error = error.data;
                        vm.success = true;
                    }
                )}


            /*
            var newPage = PageService.createPage(vm.wid, vm.page);
            if(newPage) {
                $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
            } else {
                vm.error = "Unable to create page";
                vm.success = true;
            }*/
        }

        function close(){
            vm.success = false;
        }
    }
})();