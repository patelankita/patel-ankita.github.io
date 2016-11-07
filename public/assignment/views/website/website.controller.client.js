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
                var promise = WebsiteService.findWebsiteByUser(vm.uid);
                //console.log(promise);
                promise
                    .success(function(website){
                        //console.log(website);
                        if(website != '0') {
                        vm.websites = website;
                    }
                })
                    .error(function(ERROR){
                        vm.error = "ERROR";
                    });
            }
            init();
    }

    function NewWebsiteController($routeParams, WebsiteService, $location) {

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.createNewWebsite = createNewWebsite;

        function init(){
            var promise = WebsiteService.findWebsiteByUser(vm.uid);
            promise
                .success(function(website){
                    if(website != '0') {
                        vm.websites = website;
                    }
                })
                .error(function(ERROR){
                    vm.error = "ERROR";
                });
        }
        init();

        function createNewWebsite(newWebsite){
            if(newWebsite.name === null){
                vm.error="Please enter the Name of the website";
            }
            else{
                var promise = WebsiteService.createWebsite($routeParams.uid, newWebsite);
                promise
                    .success(function (website) {
                       // console.log(website);
                        $location.url("/user/" + $routeParams.uid + "/website");
                    })
                    .error(function (ERROR) {
                        vm.error = "ERROR..OOPS!! Something went wrong.. Please try again..";
                    });
                // console.log(newCreatedWebsite);
                // if (newCreatedWebsite) {
                //     $location.url("/user/" + $routeParams.uid +"/website");
                // }
                // else {
                //     vm.error = "OOPS!! Something went wrong.. Please try again.."
                // }

            }
        }

    }

    function EditWebsiteController($routeParams, WebsiteService, $location) {

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init(){
            var promise = WebsiteService.findWebsiteByUser(vm.uid);
            promise
                .success(function(website){
                    if(website != '0') {
                        vm.websites = website;
                    }
                })
                .error(function(ERROR){
                    vm.error = "ERROR";
                });
        }
        init();

        function initialize() {
            var promise = WebsiteService.findWebsiteById(vm.wid);
            promise
                .success(function (website) {
                    console.log(website);
                    if (website != '0') {
                        vm.website = website;
                    }
                })
                .error(function (ERROR) {
                    vm.error = "ERROR";
                });
        }initialize();


        function updateWebsite(webId, newWebsite) {

            WebsiteService.updateWebsite(webId, newWebsite)
                .then(function (response) {
                        $location.url("/user/" + $routeParams.uid + "/website");
                    },
                    function (error) {
                        vm.error = "Oops!! Website id does not match !!";
                    });

            // var promise = WebsiteService.updateWebsite(webId, newWebsite);
            // promise
            //     .success
            //  console.log(nWebsite);
            // if (nWebsite) {
            //     $location.url("/user/" + $routeParams.uid + "/website");
            // }
            // else {
            //     vm.error = "Oops!! Website id does not match !!"
            // }
        }

        function deleteWebsite(websiteId) {
            var promise = WebsiteService.deleteWebsite(websiteId);
            promise
                .success(function (success) {
                    $location.url("/user/" + $routeParams.uid + "/website");
                })
                .error(function (ERROR) {
                    vm.error = "ERROR..OOPS!! Something went wrong.. Please try again..";
                });


            // var result = WebsiteService.deleteWebsite(websiteId);
            // // console.log(result);
            //
            // if (result != null) {
            //     $location.url("/user/" + $routeParams.uid + "/website");
            // }
            // else {
            //     vm.error = "Oops!! Something went wrong..Please try again.."
            // }

        }
    }

})();
