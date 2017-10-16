(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController",NewWidgetController)
        .controller("EditWidgetController",EditWidgetController)
        .controller("FlickrImageSearchController",FlickrImageSearchController);

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
            // console.log(w);

            if (w.type === "YOUTUBE" || w.type === "IMAGE" || w.type === "HTML"|| w.type === "HEADING" || w.type === "TEXT"){
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + w._id);
            }
            else{
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            }

        }

    }

    function NewWidgetController($location ,$routeParams, WidgetService){
        var vm = this;
        vm.createWidget = createWidget;


            vm.uid = $routeParams.uid;
            vm.wid = $routeParams.wid;
            vm.pid = $routeParams.pid;
            vm.wgid = $routeParams.wgid;

            vm.createYoutubeWidget = {name: "Youtube Widget", type: "YOUTUBE", width: "100%", url: "https://youtu.be/AM2Ivdi9c4E"};
            vm.createHeaderWidget = {name: "Header Widget", type: "HEADING", size: 3, text: "Lorem ipsum"};
            vm.createImageWidget = {name: "Image Widget", type: "IMAGE", width: "100%", url: "http://lorempixel.com/400/200/"};
            vm.createHTMLWidget = {name: "HTML Widget", type: "HTML", text: "New HTML Widget"};
            vm.createTextWidget = {name: "Text Widget", type: "TEXT", formatted: false, rows: 1, placeholder: "", text: "new"};


        function createWidget(newWidgetType) {
                // console.log(newWidgetType);
                var promise = WidgetService.createWidget(vm.pid, newWidgetType);
                promise
                    .success(function (widget) {
                        // console.log(widget);
                        // console.log(widget._id);
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
            if(newWidget.name) {
                WidgetService.updateWidget(vm.wgid, newWidget)
                    .then(function (response) {
                            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                        },
                        function (error) {
                            vm.error = "Oops!! Page id does not match !!";
                        });
            }
            else {
                vm.error = "You did not fill all the required fields!!";
            }


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

    function FlickrImageSearchController($location ,$routeParams, FlickrService, WidgetService){
        var vm = this;
        vm.uid=$routeParams.uid;
        vm.wid=$routeParams.wid;
        vm.pid=$routeParams.pid;
        vm.wgid=$routeParams.wgid;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response){
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    });
        }

        function selectPhoto(photo) {
            console.log(photo);
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";

            var widget = {
                _id : vm.wgid,
                widgetType : 'IMAGE',
                pageId : vm.pid,
                url : url,
                width: "100%"
            };

            WidgetService
                .updateWidget(vm.wgid,widget)
                .then(function(response){
                    var url = "/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+vm.wgid;
                    $location.url(url);
                });
        }

    }

})();

