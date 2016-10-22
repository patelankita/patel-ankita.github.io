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

    function NewWidgetController($location ,$routeParams, WidgetService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.createWidget = createWidget;

        function createWidget(newWidgetType){
            var w = {};
            w.WidgetType = newWidgetType;
            var newCreatedWidget = WidgetService.createWidget(vm.pid, w);

            if (newCreatedWidget) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + vm.wgid);
            }
            else {
                    vm.error = "OOPS!! Something went wrong.. Please try again..";
            }

        }
    }

    function EditWidgetController($routeParams, WidgetService){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = vm.deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);

        }
        init();

        function updateWidget(newWidget){
            var res = WidgetService.updateWidget(newWidget);

            if(res){
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            }
            else{
                vm.error ="OOPS!! Something went wrong.. Please try again..";
            }

        }

        function deleteWidget() {
            var res = WidgetService.deleteWidget(vm.wgid);
            if (res) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            } else {
                vm.error = "OOPS!! Something went wrong.. Please try again..";
            }
        }

    }

})();

