(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        // var websites = [
        //     {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        //     {"_id": "234", "name": "Tweeter", "developerId": "123", "description": "Lorem"},
        //     {"_id": "456", "name": "Gizmodo", "developerId": "123", "description": "Lorem"},
        //     {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        //     {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        //     {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        // ]

        var api = {

            createWebsite: createWebsite,
            findWebsiteByUser: findWebsiteByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };
        return api;

        function createWebsite(userId, nWebsite) {
            // {
            //     var nWebsite = {
            //         _id :(new Date()).getTime()+"" ,
            //         name: nWebsite.name,
            //         developerId: userId,
            //         description: nWebsite.description};
            //     websites.push(nWebsite);
            //     return nWebsite;
            // }
            return $http.post("/api/user/" + userId + "/website", nWebsite);

        }

        function findWebsiteByUser(userId) {
            // var user_website = [];
            // for (var w in websites) {
            //     if (websites[w].developerId === userId)
            //         user_website.push(websites[w]);
            // }
            // return user_website;
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+ websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, newWebsite) {
            // for(var w in websites) {
            //     website = websites[w];
            //     if(website._id === websiteId){
            //         website.name = newWebsite.name;
            //         website.description = newWebsite.description;
            //         return true;
            //     }
            // }
            // return false;
            var url = "/api/website/" + websiteId;
            return $http.put(url, newWebsite);
        }

        function deleteWebsite(websiteId) {
            // for(var index=0; index<websites.length;index++){
            //     if(websites[index]._id === websiteId){
            //         websites.splice(index,1);
            //         console.log(websites);
            //         return websites;
            //     }
            // }
            // return null;
            var url = "/api/website/" + websiteId;
            return $http.delete(url);

        }
    }
})();

