(function(){
    angular
        .module("wamDirectives", [])
        .directive("wamDirectives", wamDirectives);

    function wamDirectives() {
        function link(scope, element, attrs) {
            var start = null;
            var current = null;
            var end   = null;
            var first = null;
            var startIndex = -1;
            var toUpdate = null;
            var edit = false;

           // $('#Div').draggable({ iframeFix: true });
            $(element)
                .sortable({
                    opacity: 0.75,
                    axis: "y",
                    start: function(event, ui) {
                        //$("iframe").css("pointer-events", "none");
                        //$('.iframefix').css("color: white");
                        /// /$("iframe").blur();
                        start = $(ui.item).index();

                       // $(element).data('preventBehaviour', true);
                        //console.log(start);
                       // $("iframe").contentWindow.focus();
                    },
                    stop: function(event, ui) {
                      //  $("iframe").css("pointer-events", "");
                        var end = $(ui.item).index();//ui.item.index();
                       // $(element).data('preventBehaviour', false);
                        scope.someCtrlFn({start: start, end: end});
                    }
                });


           // $scope.startFunction = function(start, end){
            //    $scope.$broadcast('startfunction');
            //};
        }
        return {
            scope: {
                someCtrlFn: '&callbackFn',
                togglableEdit: '=',
            },
            link: link
        };
    }
})();