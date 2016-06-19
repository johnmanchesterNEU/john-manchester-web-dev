(function(){
    angular.module("MyDirectives",[])
        .directive("todos", todos);

    function  todos()
    {

        var startIndex = null;
        var stopIndex = null;
        function linker(scope, element, attributes){
            var myScope = scope;

            $(element)
                .find("tbody")
                .sortable({
                    axis:y,
                    start: function () {
                        startIndex = ui.sort().index();
                        console.log(startIndex);
                    },
                    stop: function () {
                        stopIndex = ui.sort().index();
                        console.log(stopIndex);

                        function  reorderTodos(startIndex, stopIndex) {
                            myScope.callback({start:startIndex, end:endIndex});
                            var reorderedElement = myScope.data.splice(startIndex,1);
                            myScope.splice(stopIndex, 0, reorderedElement);
                            myScope.$apply();
                        }


                        var elementSorted =  scope.ui;
                    }
                });
        }

        return{
            template: "index.html",
            scope:{
                data:"=",
                reorderTodos: "&"
            },
            link: linker
        }
    }
})();