(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets =
            [
                { "_id": "123", "widgetType": "HEADER", "pageId": "432", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADER", "pageId": "432", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "432", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "432", "text": '<p>Watchmaker <a href="http://gizmodo.com/tag/mbf" rel="nofollow">MB&amp;F</a> isn’t as well-known as  Rolex or Timex, but that’s because the company’s unique creations—like a <a href="http://gizmodo.com/listen-to-an-18-000-tie-fighter-music-box-play-the-sta-1717444112" rel="nofollow">TIE Fighter-shaped music box</a> that plays the <em>Star Wars</em> theme—are made for die-hard collectors. Its latest creation is a <a href="https://www.mbandf.com/en/machines/co-creations/astrograph" target="_blank" rel="noopener">rocket-shaped pen inspired by the moon landing</a>, and I’m desperately trying to justify…<span class="read-more-placeholder"></span><span class="readmore-core-decorated"></span></p>'},
                { "_id": "567", "widgetType": "HEADER", "pageId": "534", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "432", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "534", "text": '<p>Lorem ipsum</p>'}
            ]

        var api = {

            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            updateImageWidget : updateImageWidget

        };
        return api;

        function createWidget(pageId, wtype){
            var nWidget = {
                _id :(new Date()).getTime()+"" ,
                widgetType : wtype,
                pageId :pageId,
                };
            widgets.push(nWidget);
            console.log(widgets);
            return nWidget;
        }

        function findWidgetsByPageId(pageId) {
            var widget_arr = [];
            for(var w in widgets){
                if(widgets[w].pageId === pageId){
                    widget_arr.push(widgets[w]);
                }
            }
            return widget_arr;

        }

        function findWidgetById(widgetId){
            for(var w in widgets){
                widget = widgets[w];
                if(widget._id === widgetId){
                    return widget;
                }
            }
            return null;
        }

        function updateWidget(widgetId, newWidget) {
            for(var w in widgets){
                widget = widgets[w];
                if(widget._id === widgetId){
                    widget.text = newWidget.text;
                    widget.size = newWidget.size;
                    return true;
                }
            }
            return false;
        }

        function updateImageWidget(widget) {
            widgets.push(widget);
            console.log(widgets)

        }

        function deleteWidget(widgetId) {
            for(var w=0; w<widgets.length; w++){
                if(widgets[w]._id === widgetId){
                    widgets.splice(w,1);
                    return widgets;
                }
            }
            return null;
        }
    }
})();
