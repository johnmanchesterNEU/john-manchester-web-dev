(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        vm.init = init;
        vm.close = close;

        function init() {
            // console.log(vm.websiteId);
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                        //console.log(response.data);
                        vm.website = response.data;

                    },
                    function (error) {
                        vm.error = error.data;
                        vm.success = true;
                    });
            //vm.website = WebsiteService.findWebsiteUserWebsiteId(vm.userId, vm.websiteId);
        }

        init();

        function close() {
            vm.success = false;
        }

        function deleteWebsite() {
            //nsole.log(isValid);
            //console.log(websiteId);
            //console.log(vm.websiteId);

            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website");
                    },
                    function (error) {
                        vm.error = error.data;
                        vm.success = true;
                    }
                )
        }


        function updateWebsite(isValid) {
            console.log(isValid);
            if (isValid) {
                WebsiteService
                    .updateWebsite(vm.websiteId, vm.website)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/website");
                        },
                        function (error) {
                            vm.error = error.data;
                            vm.success = true;
                        }
                    )
            }
        }
    }
})();