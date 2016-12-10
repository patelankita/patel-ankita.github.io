module.exports = function(){

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://mlab:mlab@ds157247.mlab.com:57247/wan-fall-2016');
    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();
    var widgetModel = require("./widget/widget.model.server.js")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };
    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);
    return model;
};
