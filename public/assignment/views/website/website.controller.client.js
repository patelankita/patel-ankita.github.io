(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController)
        .controller("NewWebsiteController",NewWebsiteController)
        .controller("EditWebsiteController",EditWebsiteController);
    
    function WebsiteListController($routeParams, WebsiteService) {

            var vm = this;
            vm.uid = $routeParams.uid;

            function init(){
                vm.websites = WebsiteService.findWebsiteByUser(vm.uid);
                console.log(vm.websites);
            }
            init();

    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createNewWebsite = createNewWebsite;

        function init(){
            vm.websites = WebsiteService.findWebsiteByUser(vm.uid);
            console.log(vm.websites);
        }
        init();

        function createNewWebsite(newWebsite){
            if(newWebsite.name === null){
                vm.error="Please enter the Name of the website";
            }
            else{
                var newCreatedWebsite = WebsiteService.createWebsite($routeParams.uid, newWebsite);
                console.log(newCreatedWebsite);
                if (newCreatedWebsite) {
                    $location.url("/user/" + $routeParams.uid +"/website");
                }
                else {
                    vm.error = "OOPS!! Something went wrong.. Please try again.."
                }

            }
        }

    }

    function EditWebsiteController($routeParams, WebsiteService, $location) {

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsiteByUser(vm.uid);
        }
        init();

        var web = WebsiteService.findWebsiteById(vm.wid);
        if (web != null) {
            vm.website = web;
        }

        function updateWebsite(webId, newWebsite) {
            var nWebsite = WebsiteService.updateWebsite(webId, newWebsite);
             console.log(nWebsite);
            if (nWebsite) {
                $location.url("/user/" + $routeParams.uid + "/website");
            }
            else {
                vm.error = "Oops! Website id does not match !!"
            }
        }

        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            // console.log(result);

            if (result != null) {
                $location.url("/user/" + $routeParams.uid + "/website");
            }
            else {
                vm.error = "Opps!! Something went wrong..Please try again.."
            }

        }
    }

})();
