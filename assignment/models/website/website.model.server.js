module.exports = function () {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.model.schema")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        createWebsiteForUser:createWebsiteForUser,
        findWebsiteById: findWebsiteById
    }

    return api;

    function createWebsiteForUser(userId, website){
        website._user = userId;
        return Website.create(website);
    }


    function  findAllWebsitesForUser(userId) {
        return Website.find({"_user":userId});
    }

    function findWebsiteById(websiteId){
        return Website.findById({_id: websiteId});
    }

    function  updateWebsite(websiteId, website) {
        return Website
            .update({_id:websiteId},{
                $set: website
            });
    }
    
    function  deleteWebsite(websiteId) {
        return Website.remove({_id:websiteId});
    }
}/**
 * Created by John on 6/7/2016.
 */
