(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    //FlickrService
    function FlickrImageSearchController($location, $routeParams,FlickrService, WidgetService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function searchPhotos(searchText) {
            console.log(searchText);
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response) {
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }


        //createWidget(pageId, widget)
        function selectPhoto(photo) {
            //alert(photo.id);
           var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
           url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
           if(vm.wgid){
               //updateWidget(widgetId, widget)p
               WidgetService
                   .updateWidget(vm.wgid, {url: url, widgetType:"IMAGE", pageId:vm.pid})
                   .then(

                   );
           }
           else{
               WidgetService
                   .createWidget(vm.pid, {url: url, width:"100%", widgetType:"IMAGE"})
                   //.updateWidget(wid, pid, widgetId, {url: url, widgetType:"IMAGE"})
                   .then(

                   );
           }
        }



    }
})();