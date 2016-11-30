module.exports = function(){
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var websiteModel= mongoose.model("websiteModel", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        deleteWebsite: deleteWebsite,
        updateWebsite: updateWebsite,
        findWebsiteById: findWebsiteById,
        findWebsiteByUser: findWebsiteByUser,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsite(userId, website){
        return model.userModel
            .findUserById(userId)
            .then(function (user) {
                    website._user = user._id;
                    return websiteModel
                        .create(website)
                        .then(function (nWebsite) {
                                user.websites.push(nWebsite);
                                user.save();
                                return nWebsite;
                            },
                            function (err) {
                                console.log(error);
                            });
                },
                function (err) {
                    return null;
                });
    }

    function updateWebsite(wId , website){
        // delete nUser._id;

        return websiteModel
            .update({_id: wId},{
                $set: website });
    }

    function deleteWebsite(wid){
        return websiteModel.remove({_id: wid});
    }

    function findWebsiteById(wid){
        return websiteModel.findById(wid);
    }

    function findWebsiteByUser(uid) {
        return websiteModel.find({
            "_user": uid });
    }




}
