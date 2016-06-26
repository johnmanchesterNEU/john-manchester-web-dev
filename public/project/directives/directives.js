(function(){
    angular
        .module("dropdown", [])
        .directive("dropdown", function() {
            return{
                scope:{
                value: '='
            },
            link: function($scope, $elem, $attr, ngModel) {
                  //  $(el).click(function() {
                      //  $("#countryInput").val($scope.value.name);
                       // $("#navcontainer").hide();

            //        }
          //  );
                }
            }})
        })();