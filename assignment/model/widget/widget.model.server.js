module.exports = function(){
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var widgetModel= mongoose.model("widgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        deleteWidget: deleteWidget,
        updateWidget: updateWidget,
        findWidgetById: findWidgetById,
        findAllWidgetsForPage: findAllWidgetsForPage,
        reorderWidget: reorderWidget,
        setModel: setModel
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pId, widget) {
        widget._page = pId;

        return widgetModel
            .find({"_page" : pId})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    return widgetModel
                        .create(widget)
                        .then(function(nWidget){
                            return model.pageModel
                                .findPageById(pId)
                                .then(function(page){
                                    page.widgets.push(nWidget);
                                    page.save();
                                    return nWidget;
                                },
                                function(err){
                                    console.log(error);
                                });
                    },
                            function(err){
                                console.log(error);
                            });
                },
                function (err) {
                    return null;
                }
            );
    }


    function updateWidget(wId , widget){
        // delete nUser._id;

        return widgetModel
            .update({_id: wId},{
                $set: widget });
    }

    function deleteWidget(wid){
       return widgetModel.remove({_id: wid})
    }

    function findWidgetById(wid){
        return widgetModel.findById(wid);
    }

    function findAllWidgetsForPage(pid) {
        return widgetModel.find({
            "_page": pid });
    }

    function reorderWidget(pageId, start, end) {

        return widgetModel
            .find({_page: pageId}, function (error, widgets) {
                widgets.forEach(function (widget) {
                    if (start < end) {
                        if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                        }
                        else if (widget.order > start && widget.order <= end) {
                            widget.order = widget.order - 1;
                            widget.save();
                        }
                    } else {
                        if (widget.order === start) {
                            widget.order = end;
                            widget.save();
                        }

                        else if (widget.order < start && widget.order >= end) {
                            widget.order = widget.order + 1;
                            widget.save();
                        }
                    }
                });
            });
    }


}
