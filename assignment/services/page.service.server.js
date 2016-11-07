module.exports = function(app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "123", "description": "Lorem" },
        { "_id": "322", "name": "Post 4", "websiteId": "123", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "234", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var page = req.body;
        var webId = req.params.websiteId;
        page.websiteId = webId;
        page._id = (new Date().getTime()).toString();
        pages.push(page);
        res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;
        var result = [];
        for(var p in pages) {
            if(pages[p].websiteId === wid) {
                result.push(pages[p]);
                // res.send(result);
                // return;
            }
        }
        res.send(result);
    }

    function findPageById(req, res) {
        var pid = req.params.pageId;
        //var result = [];
        for(var p in pages) {
            if(pages[p]._id === pid) {
                //result.push(websites[w]);
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }


    function updatePage(req, res) {
        var page = req.body;
        var pid = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pid) {
                pages[p] = page;
                res.sendStatus(200);
                return;
            }
        }
        res.send(400);
    }


    function deletePage(req, res) {
        var pid = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pid) {
                pages.splice(p, 1);
            }
        }
        res.send(200);
    }


};
