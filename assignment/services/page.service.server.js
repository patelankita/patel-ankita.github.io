module.exports = function(app, model) {

    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "123", "description": "Lorem" },
    //     { "_id": "322", "name": "Post 4", "websiteId": "123", "description": "Lorem" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "234", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    // ];

    var pageModel = model.pageModel;

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;

        pageModel
            .createPage(websiteId, page)
            .then(
                function(newWebsite) {
                    res.send(newWebsite);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )
        // var webId = req.params.websiteId;
        // page.websiteId = webId;
        // page._id = (new Date().getTime()).toString();
        // pages.push(page);
        // res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function(pages) {
                    console.log(pages);
                    res.json(pages);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
        // var result = [];
        // for(var p in pages) {
        //     if(pages[p].websiteId === wid) {
        //         result.push(pages[p]);
        //         // res.send(result);
        //         // return;
        //     }
        // }
        // res.send(result);
    }

    function findPageById(req, res) {
        var pid = req.params.pageId;

        pageModel
            .findPageById(pid)
            .then(
                function(page) {
                    res.send(page);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );

        // var result = [];
        // for(var p in pages) {
        //     if(pages[p]._id === pid) {
        //         //result.push(websites[w]);
        //         res.send(pages[p]);
        //         return;
        //     }
        // }
        // res.send('0');
    }


    function updatePage(req, res) {
        var page = req.body;
        var pid = req.params.pageId;

        pageModel
            .updatePage(pid, page)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );

        // for(var p in pages) {
        //     if(pages[p]._id === pid) {
        //         pages[p] = page;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }


    function deletePage(req, res) {
        var pid = req.params.pageId;

        pageModel
            .deletePage(pid)
            .then(
                function(status){
                    res.send(200);
                },
                function(error){
                    res.statusCode(404).send(err);
                }
            );

        // for(var p in pages) {
        //     if(pages[p]._id === pid) {
        //         pages.splice(p, 1);
        //     }
        // }
        // res.send(200);
    }


};
