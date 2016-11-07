(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController)
        .controller("NewPageController",NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams,PageService) {
        var vm = this;

        function init(){
            vm.uid = $routeParams.uid;
            vm.wid = $routeParams.wid;
            var promise = PageService.findPageByWebsiteId(vm.wid);
            promise
                .success(function(page){
                    if(page != '0') {
                        vm.pages = page;
                    }
                })
                .error(function(ERROR){
                    vm.error = "ERROR";
                });

        }
        init();
    }
    
    function NewPageController($routeParams, PageService, $location){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createNewPage = createNewPage;

        function createNewPage(userId,webId,newPage){

            if(newPage.name == null){
                vm.error = "Please enter the Name of the page";
            }
            else{
                var promise = PageService.createPage(webId, newPage);
                promise
                    .success(function (page) {
                        //console.log(page);
                        $location.url("/user/" + userId + "/website/" + webId + "/page");
                    })
                    .error(function (ERROR) {
                        vm.error = "ERROR..OOPS!! Something went wrong.. Please try again..";
                    });
            }
        }
    }

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        // var page = PageService.findPageById(vm.pid);
        //
        // if (page != null) {
        //     vm.page = page;
        // }

        function initialize() {
            var promise = PageService.findPageById(vm.pid);
            promise
                .success(function (page) {
                   // console.log(page);
                    if (page != '0') {
                        vm.page = page;
                    }
                })
                .error(function (ERROR) {
                    vm.error = "ERROR";
                });
        }initialize();

        function updatePage(pageId, newPage) {
            PageService.updatePage(pageId, newPage)
                .then(function (response) {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                    },
                    function (error) {
                        vm.error = "Oops!! Page id does not match !!";
                    });
        }


        function deletePage(pageId) {
            var promise = PageService.deletePage(pageId);
            promise
                .success(function (success) {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                })
                .error(function (ERROR) {
                    vm.error = "ERROR..OOPS!! Something went wrong.. Please try again..";
                });

            // var result = PageService.deletePage(pageId);
            // console.log(result);
            // if (result != null) {
            //     $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
            // }
            // else {
            //     vm.error = "Oops!! Something went wrong..Please try again.."
            // }

        }

    }


})();
