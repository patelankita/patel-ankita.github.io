module.exports = function(){
    var model= {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var pageModel= mongoose.model("pageModel", PageSchema);

    var api = {
        createPage: createPage,
        deletePage: deletePage,
        updatePage: updatePage,
        findPageById: findPageById,
        findAllPagesForWebsite: findAllPagesForWebsite,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId, page) {
        return model.websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                page._website = website._id;
                return pageModel
                    .create(page)
                    .then(function (nPage) {
                            website.pages.push(nPage);
                            website.save();
                            return nPage;
                        },
                        function (err) {
                            console.log(error);
                        });
        },
    function (err) {
        return null;
    });
}

    function updatePage(pId , page){
        // delete nUser._id;

        return pageModel
            .update({_id: pId},{
                $set: page });
    }

    function deletePage(pid){
        return pageModel.remove({_id: pid});
    }

    function findPageById(pid){
        return pageModel.findById(pid);
    }

    function findAllPagesForWebsite(wid) {
        return pageModel.find({
            "_website": wid });
    }




}
