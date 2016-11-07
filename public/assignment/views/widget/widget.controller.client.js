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
            var promise = WidgetService.findWidgetsByPageId(vm.pid);
            promise
                .success(function(widget){
                    if(widget != '0') {
                        vm.widgets = widget;
                    }
                })
                .error(function(ERROR){
                    vm.error = "ERROR";
                });
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
        vm.createYoutubeWidget = {"_id": "" , "widgetType": "YOUTUBE", "pageId": vm.pid, "width": "" , "url": "" };
        vm.createHeaderWidget ={ "_id": "", "widgetType": "HEADER", "pageId": vm.pid, "size": "", "text": ""};
        vm.createImageWidget= { "_id": "", "widgetType": "IMAGE", "pageId": vm.pid, "width": "", "url": ""};
        vm.createWidget = createWidget;

        function createWidget(newWidgetType) {

                var promise = WidgetService.createWidget(vm.pid, newWidgetType);
                promise
                    .success(function (widget) {
                        //console.log(page);
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
                    })
                    .error(function (ERROR) {
                        vm.error = "ERROR..OOPS!! Something went wrong.. Please try again..";
                    });
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
            var promise = WidgetService.findWidgetById(vm.wgid);
            promise
                .success(function (widget) {
                    // console.log(page);
                    if (widget != '0') {
                        vm.widget = widget;
                    }
                })
                .error(function (ERROR) {
                    vm.error = "ERROR";
                });


        }
        init();

        function updateWidget(newWidget){
            WidgetService.updateWidget(vm.wgid,newWidget)
                .then(function (response) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                },
                function (error) {
                    vm.error = "Oops!! Page id does not match !!";
                });

        }

        function deleteWidget(widget) {

            var promise = WidgetService.deleteWidget(widget._id);
            promise
                .success(function (success) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function (ERROR) {
                    vm.error = "ERROR..OOPS!! Something went wrong.. Please try again..";
                });
        }

    }

})();

