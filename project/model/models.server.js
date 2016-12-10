module.exports = function(){

    var mongoose2 = require('mongoose');
    mongoose2.connect('mongodb://ankita:ankita@ds129018.mlab.com:29018/project-fall-16');

    var model = {
        projectUserModel: require("./user/user.model.server.js")(),
        projectSearchModel: require("./search/search.model.server.js")(),
        projectResultModel: require("./result/result.model.server.js")()
    };
    return model;
};
