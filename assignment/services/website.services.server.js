module.exports = function (app, models) {

    var websiteModel = models.websiteModel;

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "blah"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "yeah"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "dah"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "do"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "re"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "me"}
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
          websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function(website) {
                    res.json(website);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );

        /*var website = req.body;
        var newWebsite = {
            _id: (new Date()).getTime() + "",
            name: website.name,
            description: website.description,
            developerId: website.developerId
        };
        websites.push(newWebsite);
        res.json(newWebsite);
        //return newWebsite;*/
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(website) {
                    res.json(website);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );

      /*  var resultSet = [];
        for (var i in websites) {
            if (websites[i].developerId === developerId) {
                resultSet.push(websites[i]);
            }
        }
        //return resultSet;
        res.send(resultSet);*/
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    //console.log(website);
                    res.json(website);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );

        /*var id = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === id) {
                res.send(websites[i]);
            }
        }
        //return resultSet;
        res.send(404);*/
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function(website) {
                    //console.log(website);
                    res.json(website);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
        /*var id = req.params.websiteId;
        var updateWeb = req.body;
        for (var i in websites) {
            if (websites[i]._id === id) {
                websites[i].name = updateWeb.name;
                websites[i].description = updateWeb.description;
                res.send(200);
                return;
            }
        }
        res.status(400).send("Website with ID: " + id + " not found");
        *//*
         var index = findWebsiteIndex(websiteId);
         if(index != -1) {
         websites[index].name = website.name;
         websites[index].description = website.description;
         }else {
         res.send(404);
         }*/
    }

    //Deletes the website from the server with a given id
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function(website) {
                    //console.log(website);
                    res.json(website);
                },
                function (error) {
                    res.statusCode(400).send(error);
                });
        /*var id = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === id) {
                websites.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.status(404).send("Unable to remove website with ID: " + id);*/
    }


    /*

     function findWebsiteUserWebsiteId(userId, websiteId) {
     for (var i in websites) {
     if (websites[i]._id === websiteId && websites[i].developerId === userId) {
     return websites[i];
     }
     }
     return null;
     }

     function findWebsiteIndex(websiteId) {
     for (var i in websites) {
     if (websites[i]._id === websiteId) {
     return i;
     }
     }
     return -1;
     }

     function updateWebsite(websiteId, website) {
     var index = findWebsiteIndex(websiteId);
     websites[index].name = website.name;
     websites[index].description = website.description;
     return (index != -1)? true : false;
     }

     function deleteWebsite(websiteId) {
     for (var i in websites) {
     if (websites[i]._id === websiteId) {
     websites.splice(i, 1);
     return true;
     }
     }
     return false;
     }*/

};