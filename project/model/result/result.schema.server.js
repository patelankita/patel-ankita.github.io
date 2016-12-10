/**
 * Created by Ankita on 12/7/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var ResultSchema = mongoose.Schema({
        question_id: {type: mongoose.Schema.ObjectId, ref:"ProjectSearch"},
        body: String,
        answered_by: {type: mongoose.Schema.ObjectId, ref:"ProjectUser"},
        is_checked: {type: Boolean,default: false},
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "project-result"});

    return ResultSchema;
};
