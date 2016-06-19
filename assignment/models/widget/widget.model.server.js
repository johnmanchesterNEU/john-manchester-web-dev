module.exports = function () {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        countMe: countMe,
        callback: callback

    }
    return api;


    function findWidgetById(widgetId) {
        return Widget.findById({_id: widgetId});
    }




    // Bulk sequential updat operation that works in mongo shell
    // but I could not get to work here.
    function shiftUp(pageId, start, end) {
        var ObjectId = require('mongodb').ObjectID;
       console.log( mongoose.assignment.widget.bulkWrite(
            [{
                updateMany: {
                    "filter": {
                        _page: ObjectId(pageId),
                        index: {$gte: start, $lt: end}
                    },
                    "update": {$inc: {"index": 1}}
                }
            },
                {
                    updateOne: {
                        "filter": {_page: ObjectId(pageId), index: start},
                        "update": {$set: {"index": end}}
                    }
                },
                {ordered: true}
            ]));
    }


    // Bulk sequential updat operation that works in mongo shell
    // but I could not get to work here.
    function shiftDown(pageId, start, end) {
        var ObjectId = require('mongodb').ObjectID;
        Widget.collection.bulkWrite(
            [{
                updateMany: {
                    "filter": {
                        _page: ObjectId(pageId),
                        index: {$gt: start, $lte: end}
                    },
                    "update": {$inc: {"index": -1}}
                }
            },
                {
                    updateOne: {
                        "filter": {
                            _page: ObjectId(pageId), index: start},
                        "update": {$set: {"index": end}}
                    }
                },
                {ordered: true}
            ]);
    }


    function reorderWidget(pageId, start, end) {
        var ObjectId = require('mongodb').ObjectID;
        if (start < end) {
            Widget.update({"_page": ObjectId(pageId), "index": {$gt: start, $lte: end}}, {$inc: {"index":  -1}},{multi:true},
                function(err, records){
                    console.log(records);
                });

           Widget.update({"_page": ObjectId(pageId), "index":start}, {$set: {index: end}},
               function(err, records){
               console.log(records);
           });

            // shiftDown(pageId, start, end);

        }
        if (start > end) {
            Widget.update({"_page": ObjectId(pageId), "index": {$gte: end, $lt: start}}, {$inc: {"index":  1}},{multi:true},
                function(err, records){
                    console.log(records);
                });

           Widget.update({"_page": ObjectId(pageId), "index":start}, {$set: {index: end}},
               function(err, records){
                   console.log(records);
               });
        } else {
           return findAllWidgetsForPage(pageId);
        }
    }



    function callback(pageId, start, end) {
        Widget.update({"_page": pageId, "index": start}, {$set: {index: end}}, function (err, success) {
            if (success) {
                return findAllWidgetsForPage(pageId)
            }
        });
    }


    function findAllWidgetsForPage(pageId) {
        return Widget.find({"_page": pageId}).sort({"index": 1});
        //return Widget.find();
    }


    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }


    function countMe(pageId) {
        return Widget.find({"_page": pageId}).count();
    }


    function updateWidget(widgetId, widget) {
        return Widget
            .update({_id: widgetId}, {
                $set: widget
            });
    }

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }


}
