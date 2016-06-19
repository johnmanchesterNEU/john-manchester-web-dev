(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPageById: findPageById,
            deletePage: deletePage,
            updatePage: updatePage,
            findAllPagesForWebsite:findAllPagesForWebsite
        };
        return api;

        function findAllPagesForWebsite(websiteId){
            //var url = "/api/user/" + userId + "/website/";
            //return $http.get(url);
            ///api/website/:websiteId/page
            //console.log(websiteId);
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url);
        }

        function updatePage(pageId, page){
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }

        function createPage(websiteId, page) {
            page.websiteId = websiteId;

           // console.log(websiteId);
            //console.log(page);
           // console.log("sss " + websiteId);
           // console.log(page);
            var url = "/api/website/"+websiteId+"/page";
            return $http.post(url, page);
           // pages.push(newPage);
           // return newPage;
        }

        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url);
        }

    }
})();