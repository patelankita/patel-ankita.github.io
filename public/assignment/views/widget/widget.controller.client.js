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
            console.log(w);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + w._id);
        }
    }

    function NewWidgetController($routeParams, WidgetService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.createWidget = createWidget;

        function createWidget(newWidgetType){
                var newCreatedWidget = WidgetService.createWidget(vm.pid, newWidgetType);

                if (newCreatedWidget) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid);
                }
                else {
                    vm.error = "OOPS!! Something went wrong.. Please try again.."
                }

        }
    }

    function EditWidgetController($routeParams, WidgetService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.updateImageWidget = updateImageWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);

        }
        init();

        function updateImageWidget(newWidget){
            console.log("in controll")
            var res = WidgetService.updateImageWidget(newWidget);

        }

    }

})();

