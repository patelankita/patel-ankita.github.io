(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {

            createWidget : createWidget,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            sort: sort
        };
        return api;

        function sort(pageId,startIndex,endIndex){
            var url = "/page/"+pageId+"/widget?initial="+startIndex+"&final="+endIndex;
            return $http.put(url);
        }

        function createWidget(pageId, widget){
            // var nWidget = widget;
            //
            // nWidget._id = (new Date()).getTime()+"";
            // nWidget.pageId = pageId;
            //
            // widgets.push(nWidget);
            //
            // return nWidget;
            return $http.post("/api/page/" + pageId + "/widget", widget);
        }

        function findWidgetsByPageId(pageId) {
            // var widget_arr = [];
            // for(var w in widgets){
            //     if(widgets[w].pageId === pageId){
            //         widget_arr.push(widgets[w]);
            //     }
            // }
            // return widget_arr;
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);

        }

        function findWidgetById(widgetId){
            // for(var w in widgets){
            //     widget = widgets[w];
            //     if(widget._id === widgetId){
            //         return widget;
            //     }
            // }
            // return null;
            var url = "/api/widget/"+ widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, newWidget) {
            // for(var w in widgets){
            //     widget = widgets[w];
            //     if(widget._id === widgetId){
            //         widget[w] = newWidget;
            //         return true;
            //     }
            // }
            // return false;
            var url = "/api/widget/" + widgetId;
            return $http.put(url, newWidget);
        }

        function deleteWidget(widgetId) {
            // for(var w=0; w<widgets.length; w++){
            //     if(widgets[w]._id === widgetId){
            //         widgets.splice(w,1);
            //         return widgets;
            //     }
            // }
            // return null;
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);

        }
    }
})();
