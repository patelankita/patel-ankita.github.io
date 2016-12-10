module.exports = function () {
    var mongoose = require("mongoose");

    var ProjectUserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: Number,
        dob: Date,
        about: String,
        skill: String,
        facebook: {
            token: String,
            id: String,
            displayName: String
        },
        google: {
            token: String,
            id: String,
            displayName: String
        },
        followed_by:[{type: mongoose.Schema.ObjectId, ref:"ProjectUser"}],
        following:[{type: mongoose.Schema.ObjectId, ref:"ProjectUser"}],
        is_admin: {type: Boolean, required: true,default: false},
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "project-user"});

    return ProjectUserSchema;
};