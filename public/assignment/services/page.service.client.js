(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "123", "description": "Lorem" },
            { "_id": "322", "name": "Post 4", "websiteId": "123", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "234", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ]

        var api = {

            createPage : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage

        };
        return api;

        function createPage(websiteId, newPage){
            var nPage = {
                    _id :(new Date()).getTime()+"" ,
                    name : newPage.name,
                    description : newPage.title,
                    websiteId :websiteId };
                pages.push(nPage);
                return nPage;
        }

        function findPageByWebsiteId(websiteId) {
            var web_page = [];
            for(var p in pages){
                if(pages[p].websiteId === websiteId){
                    web_page.push(pages[p]);
                }
            }
            return web_page;

        }

        function findPageById(pageId){
            for(var p in pages){
                page = pages[p];
                if(page._id === pageId){
                    return page;
                }
            }
            return null;
        }

        function updatePage(pageId, newPage) {
            for(var p in pages){
                page = pages[p];
                if(page._id === pageId){
                    page.name = newPage.name;
                    page.description = newPage.title;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId) {
            for(var p=0; p<pages.length; p++){
                if(pages[p]._id === pageId){
                    pages.splice(p,1);
                    return pages;
                }
            }
            return null;
        }
    }
})();
