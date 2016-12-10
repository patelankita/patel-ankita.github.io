/**
 * Created by Ankita on 12/7/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var SearchSchema = mongoose.Schema({
        stackQuestion: {type: Boolean, required: true},
        title: {type: String, required: true},
        body: String,
        posted_by: {type: mongoose.Schema.ObjectId, ref:"ProjectUser"},
        is_answered: {type: Boolean, required: true,default: false},
        stackoverflow: {
            id: String
        },
        answers: [{type: mongoose.Schema.ObjectId, ref:"ProjectResult"}],
        is_checked: {type: Boolean,default: false},
        tags: [String],
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "project-search"});

    return SearchSchema;
};
