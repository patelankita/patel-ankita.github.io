module.exports = function(app) {

    var websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "123", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "123", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    ];

    app.post('/api/user/:userId/website', createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var devId = req.params.userId;
        website.developerId = devId;
        website._id = (new Date().getTime()).toString();
        websites.push(website);
        res.send(website);
    }

    function findAllWebsitesForUser(req, res) {
        var uid = req.params.userId;
        var result = [];
        for(var w in websites) {
            if(websites[w].developerId === uid) {
                result.push(websites[w]);
                // res.send(result);
                // return;
            }
        }
        res.send(result);
    }

    function findWebsiteById(req, res) {
        var wid = req.params.websiteId;
        //var result = [];
        for(var w in websites) {
            if(websites[w]._id === wid) {
                //result.push(websites[w]);
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }


    function updateWebsite(req, res) {
        var website = req.body;
        var wid = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites[w] = website;
                res.sendStatus(200);
                return;
            }
        }
        res.send(400);
    }


    function deleteWebsite(req, res) {
        var wid = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites.splice(w, 1);
            }
        }
        res.send(200);
    }



    // function findUser(req, res) {
    //     var params = req.params;
    //     //res.send(users);
    //     var query = req.query;
    //     if(query.password && query.username) {
    //         findUserByCredentials(req, res);
    //     } else if(query.username) {
    //         findUserByUsername(req, res);
    //     }
    // }



    // function findAllWebsitesForUser(req, res) {
    //     var username = req.query.username;
    //     for(var u in users) {
    //         if(users[u].username === username) {
    //             res.send(users[u]);
    //             // return;
    //         }
    //     }
    //     res.send(400);
    // }


};