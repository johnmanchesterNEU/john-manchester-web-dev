(function(){
    angular
        .module("wcUnique", [])
        .directive("wcUnique", searchUnique);

    function searchUnique($http) {
        function link(scope, element, attrs, ngModel, http) {
            $(element).bind('input', function(){
               var keyProperty = $.parseJSON(attrs.wcUnique);
                $http.get("/unique/" + scope.modelValue).success(function(data) {
                   //console.log("return " + data);
                     ngModel.$setValidity('unique', data);
                    //ngModel.$loading = false;
                   // ngModel.$setValidity('unique', !data);
                });
            })
        }
        return {
            require: 'ngModel',
            scope: {
                modelValue: '=ngModel',
                someCtrlFn: '&callbackFn',
                togglableEdit: '=',
            },
            link: link
        };
    }
})();