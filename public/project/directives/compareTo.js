(function () {
    angular
        .module("compareTo", [])
        .directive("compareTo", compareTo);

    function compareTo(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function (modelValue) {
            return modelValue === scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function () {
            ngModel.$validate();
        });
    }

    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: link
    };
})();

