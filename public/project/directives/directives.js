(function(){
    angular
        .module("dropdown", [])
        .directive("dropdown", function() {
    return {
        scope:{
            value: '='
        },
        link: function(scope, elem, attrs) {
            $(elem).click(function() {
               //alert($(elem));
                //console.log(attrs);
               console.log(scope.value.code);
                //console.log();
                $("#countryInput").val(scope.value.name);
                $("#navcontainer").hide();
                // console.log(element.text(scope[attrs.value]));
                //console.log(scope.$eval(attrs.value));
                 //var target = $(elem).next(".panel-collapse");
               // target.hasClass("collapse") ? target.collapse("show") : target.collapse("hide");
            });
        }
    }
})})();