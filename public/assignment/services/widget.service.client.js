(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findAllWidgetsForPage: findAllWidgetsForPage,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            reorderWidget: reorderWidget,
            countMe: countMe,
        };
        return api;

        //returns a count for all the widgets for a page ID
        function countMe(pageId){
            var url = "/widgetCount/" + pageId;
            return $http.get(url);
        }

        //reorders widget on server
        function reorderWidget(pageId, start, end) {
        //function reorderWidget(pageId, start, end, widgets) {
            var url = "/page/" + pageId + "/widget?initial=" + start + "&final=" + end;
            //return $http.put(url, widgets);
            return $http.put(url);
        }
        /*function reorderWidget(pageId, start, end) {
            var url = "/page/" + pageId + "/widget?initial=" + start + "&final=" + end;
            return $http.put(url);
        }*/

        function createWidget(pageId, widget) {
            //alert(widget.url);
            console.log(pageId);
            console.log(widget);
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url, widget);
        }

        function findAllWidgetsForPage(pageId) {
            console.log(pageId)
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            // console.log(widgetId);
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }


        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }


        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

    }
})();