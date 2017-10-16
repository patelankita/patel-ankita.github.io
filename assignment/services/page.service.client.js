(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {

            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage

        };
        return api;

        function createPage(websiteId, newPage){
            // var nPage = {
            //         _id :(new Date()).getTime()+"" ,
            //         name : newPage.name,
            //         description : newPage.title,
            //         websiteId :websiteId };
            //     pages.push(nPage);
            //     return nPage;
            return $http.post("/api/website/" + websiteId + "/page", newPage);

        }

        function findPageByWebsiteId(websiteId) {
            // var web_page = [];
            // for(var p in pages){
            //     if(pages[p].websiteId === websiteId){
            //         web_page.push(pages[p]);
            //     }
            // }
            // return web_page;
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);

        }

        function findPageById(pageId){
            // for(var p in pages){
            //     page = pages[p];
            //     if(page._id === pageId){
            //         return page;
            //     }
            // }
            // return null;
            var url = "/api/page/"+ pageId;
            return $http.get(url);
        }

        function updatePage(pageId, newPage) {
            // for(var p in pages){
            //     page = pages[p];
            //     if(page._id === pageId){
            //         page.name = newPage.name;
            //         page.description = newPage.title;
            //         return true;
            //     }
            // }
            // return false;/api/page/:pageId
            var url = "/api/page/" + pageId;
            return $http.put(url, newPage);

        }

        function deletePage(pageId) {
            // for(var p=0; p<pages.length; p++){
            //     if(pages[p]._id === pageId){
            //         pages.splice(p,1);
            //         return pages;
            //     }
            // }
            // return null;
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }
})();
