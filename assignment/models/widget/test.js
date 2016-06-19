db.assignment.widget.bulkWrite(
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
                "filter": {_page: ObjectId(pageId), "index": start},
                "update": {$set: {"index": end}}
            }
        }, {ordered: true}])
