module.exports = function(){
   // var Widget = mongoose.model("Widget", WidgetSchema);

    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.ObjectId, ref: "Page"},
        type: {
            type: String,
            enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT','TEXT']
        },
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        index: Number,
        dateCreated: {type: Date, default:Date.now()}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};

// {"_id": "123", "name": "Facebook", "developerId": "456", "description": "blah"},