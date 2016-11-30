module.exports = function(app, model) {

    // var users = [
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];

    var userModel = model.userModel;

    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);

    function deleteUser(req, res) {
        var uid = req.params.userId;
        userModel
            .deleteUser(uid)
            .then(
                function(status) {
                    res.send(200)
                },
                function(error){
                    res.sendStatus(400).send(error);
                });

        // for(var u in users) {
        //     if(users[u]._id == uid) {
        //         users.splice(u, 1);
        //     }
        // }
        // res.send(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.userId;
        userModel
            .updateUser(userId, user)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });

        // for(var u in users) {
        //     if(users[u]._id == uid) {
        //         users[u] = user;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(nUser) {
                    res.send(nUser)
                },
                function(error){
                    res.sendStatus(400).send(error);
                });
        // users.push(user);
        // res.send(user);
    }

    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
       if(query.password && query.username) {
           findUserByCredentials(req, res);
        } else if(query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        // console.log(username);
        // console.log(password);
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(users) {
                    if (users.length > 0) {
                        res.json(users[0]);
                    }
                    else {
                        res.send('0');
                    }

                },
                function(err){
                    res.sendStatus(400).send(err);
                });

    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(
                function(users) {
                    if (users.length > 0) {
                        res.json(users[0]);
                    }
                    else{
                        res.sendStatus(400).send(err);
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    res.send(user);
                },
                function(err){
                    res.sendStatus(400).send(error);
                });
        // for(var u in users) {
        //     if(users[u]._id === userId) {
        //         res.send(users[u]);
        //         return;
        //     }
        // }
        // res.send('0');
    }
};