(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteById: findWebsiteById,
            deleteWebsite: deleteWebsite,
            updateWebsite: updateWebsite
        };
        return api;

        function createWebsite(userId, website) {
           // console.log(userId);
            //console.log(website);
        //    var newWebsite = {
         //       _id: (new Date()).getTime() + "",
         //       name: website.name,
         //       description: website.description,
         //       developerId: developerId
         //  };

            //POST ///api/user/:userId/website  //createWebsite

           // console.log(newWebsite);
            var url = "/api/user/" + userId + "/website";
            //return $http.post("/api/user", user);
            //app.post("/api/user/:userId/website", createWebsite);
            return $http.post(url, website);
            //websites.push(newWebsite);
            //return newWebsite;
        }


        function findAllWebsitesForUser(userId) {
            ///api/user/:userId/website
            var url = "/api/user/" + userId + "/website/";
            return $http.get(url);
        }


        function findWebsiteById(websiteId) {
            //console.log(websiteId);
            // /api/website/:websiteId
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website) {
            console.log(websiteId);
            console.log(website.name);
            console.log(website.description);
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }


        function deleteWebsite(websiteId) {
            console.log(websiteId);
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }
    }
})();