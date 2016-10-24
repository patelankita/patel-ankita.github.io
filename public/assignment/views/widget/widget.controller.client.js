(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController",NewWidgetController)
        .controller("EditWidgetController",EditWidgetController);

    function WidgetListController($sce, $routeParams, WidgetService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.getSafeHtml = getSafeHtml;
        vm.checkSafeURL = checkSafeURL;
        vm.editWidget = editWidget;
        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);

        }
        init();

        function getSafeHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function checkSafeURL(widgetURL) {
            var parts = widgetURL.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;

            return $sce.trustAsResourceUrl(url);
        }

        function editWidget(w){

            if (w.widgetType === "YOUTUBE" || w.widgetType === "IMAGE" || w.widgetType === "HEADER"){
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + w._id);
            }
            else{
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            }

        }
    }

    function NewWidgetController($location ,$routeParams, WidgetService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.createYoutubeWidget = {"widgetType": "YOUTUBE", "pageId": vm.pid, "width": "" , "url": "" };
        vm.createHeaderWidget ={ "_id": "", "widgetType": "HEADER", "pageId": vm.pid, "size": "", "text": ""};
        vm.createImageWidget= { "_id": "", "widgetType": "IMAGE", "pageId": vm.pid, "width":"", "url": ""};
        vm.createWidget = createWidget;

        function createWidget(newWidgetType) {

            var newCreatedWidget = WidgetService.createWidget(vm.pid, newWidgetType);

            if (newCreatedWidget) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + newCreatedWidget._id);
            }
            else {
                vm.error = "OOPS!! Something went wrong.. Please try again..";
            }

        }
    }

    function EditWidgetController($location, $routeParams, WidgetService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);


        }
        init();

        function updateWidget(newWidget){
            var res = WidgetService.updateWidget(vm.wgid,newWidget);
            if(res){
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            }
            else{
                vm.error ="OOPS!! Something went wrong.. Please try again..";
            }

        }

        function deleteWidget(widget) {
            var res = WidgetService.deleteWidget(widget._id);
            if (res) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            } else {
                vm.error = "OOPS!! Something went wrong.. Please try again..";
            }
        }

    }

})();

