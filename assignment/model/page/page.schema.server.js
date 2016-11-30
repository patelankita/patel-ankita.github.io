module.exports = function () {
    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref:"websiteModel"} ,
        name: {type :String, default: true},
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref:'widgetModel'}],
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "page"});

    return PageSchema;
};