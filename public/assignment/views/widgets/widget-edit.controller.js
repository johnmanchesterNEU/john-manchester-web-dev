(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        //vm.init = init;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        vm.close = close;

        function init() {
            console.log(vm.wgid);
            WidgetService
                .findWidgetById(vm.wgid)
                .then(function (response) {
                        vm.widget = response.data;
                        console.log(vm.widget);
                    console.log(vm.submitted);
                    },
                    function (error) {
                        vm.error = error.data;
                        vm.success = true;
                    });
        }

        init();

        function close() {
            vm.success = false;
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    },
                    function (error) {
                        vm.error = error.data;
                        vm.success = true;
                    }
                )
        }

        function updateWidget(isValid) {
            //console.log(widgetForm.widgetname.$error);
            //console.log(vm.submitted);
            if (isValid) {
                WidgetService
                    .updateWidget(vm.wgid, vm.widget)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
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
