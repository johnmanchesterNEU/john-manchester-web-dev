(function () {
    angular
        .module("Project")
        .controller("HomeController", HomeController);
    function HomeController($scope, $location, $anchorScroll, $window, $http) {
        var vm = this;
        vm.show = false;
        vm.social = social;

        $("#loginDialog").hide();


       // function closeLogin(){
        //    $('#dialog').dialog('close');
       // }

        function social() {
            vm.show = true;
            //$(function () {
            $("#loginDialog").dialog({modal: true, draggable: false, resizable: false, dialogClass: "social"});

            $('.ui-widget-overlay, #loginRegister, #loginBut').bind('click',function(){
                // vm.show = !vm.show;
                $('#loginDialog').dialog('close');
                //$('#dialog').dialog('close').empty()
                //alert(vm.show);
                vm.show = false;
            })

        }




        window.onbeforeunload = function(){
            $('#loginDialog').dialog('close');
        }

    }
})();