module.exports = function(){

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://mlab:mlab@ds157247.mlab.com:57247/wan-fall-2016');

    var model = {
        projectUserModel: require("./user/user.model.server.js")()
    };
    return model;
};
