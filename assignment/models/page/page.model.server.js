module.exports = function () {

    var mongoose = require("mongoose");
    var PageSchema = require("./page.model.schema.js")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage : createPage,
        findPageById: findPageById,
        findAllPagesForWebsite: findAllPagesForWebsite,
        updatePage: updatePage,
        deletePage: deletePage,
    }
    return api;


    function  createPage(websiteId, page){
        page._website = websiteId;
        return Page.create(page);
    }

    function findPageById(pageId) {
        return Page.findOne({_id: pageId});
    }


    function  findAllPagesForWebsite(websiteId) {
        return Page.find({"_website":websiteId});
    }

    function updatePage(pageId, page){
        return Page
            .update({_id:pageId},{
                 $set: page
            });
    }

    function deletePage(pageId){
        return Page.remove({_id:pageId});
    }
}





//createPage(websiteId, page)
//findAllPagesForWebsite(websiteId)
//findPageById(pageId)
//updatePage(pageId, page)
//deletePage(pageId)
