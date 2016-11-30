module.exports = function () {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, default: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: Number,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'websiteModel'}],
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "user"});

    return UserSchema;
};
