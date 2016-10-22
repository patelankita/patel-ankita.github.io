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
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
            console.log(vm.pages);
        }
        init();
    }
    
    function NewPageController($routeParams, PageService, $location){
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createNewPage = createNewPage;

        function createNewPage(userId,webId,newPage){
            if(newPage.name === null){
                vm.error = "Please enter the Name of the page";
            }
            else{
                var newCreatedPage = PageService.createPage(webId, newPage);
                console.log(newCreatedPage);
                if (newCreatedPage) {
                    $location.url("/user/" + userId + "/website/" + webId + "/page");
                }
                else {
                    vm.error = "OOPS!! Something went wrong.. Please try again.."
                }

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

        var page = PageService.findPageById(vm.pid);

        if (page != null) {
            vm.page = page;
        }

        function updatePage(pageId, newPage) {
            var nPage = PageService.updatePage(pageId, newPage);
            console.log(nPage);
            if (nPage) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
            }
            else {
                vm.error = "Oops! Page id does not match !!"
            }
        }

        function deletePage(pageId) {
            var result = PageService.deletePage(pageId);
            console.log(result);
            if (result != null) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
            }
            else {
                vm.error = "Opps!! Something went wrong..Please try again.."
            }

        }

    }


})();
