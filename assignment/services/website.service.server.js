module.exports = function(app, model) {

    // var websites = [
    //     {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    //     {"_id": "234", "name": "Tweeter", "developerId": "123", "description": "Lorem"},
    //     {"_id": "456", "name": "Gizmodo", "developerId": "123", "description": "Lorem"},
    //     {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    //     {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    //     {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    // ];

    var websiteModel = model.websiteModel;

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findWebsiteByUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var nWebsite = req.body;

        websiteModel
            .createWebsite(userId, nWebsite)
            .then(
                function(newWebsite) {
                    res.send(newWebsite);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function findWebsiteByUser(req, res) {
        var uid = req.params.userId;
        console.log(uid);

        websiteModel
            .findWebsiteByUser(uid)
            .then(
                function(websites) {
                    console.log(websites);
                    res.json(websites);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );

        // var result = [];
        // for(var w in websites) {
        //     if(websites[w].developerId === uid) {
        //         result.push(websites[w]);
        //         // res.send(result);
        //         // return;
        //     }
        // }
        // res.send(result);
    }

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;

        websiteModel
            .findWebsiteById(wid)
            .then(
                function(website) {
                    res.send(website);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
        //var result = [];
        // for(var w in websites) {
        //     if(websites[w]._id === wid) {
        //         //result.push(websites[w]);
        //         res.send(websites[w]);
        //         return;
        //     }
        // }
        // res.send('0');
    }


    function updateWebsite(req, res) {
        var website = req.body;
        var wid = req.params.websiteId;

        websiteModel
            .updateWebsite(wid, website)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );


        // for(var w in websites) {
        //     if(websites[w]._id === wid) {
        //         websites[w] = website;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }


    function deleteWebsite(req, res) {
        var wid = req.params.websiteId;
        websiteModel
            .deleteWebsite(wid)
            .then(
                function(status){
                    res.send(200);
                },
                function(error){
                    res.statusCode(404).send(err);
                }
            );
    }


};