
module.exports = function(app, model) {

    var userModel = model.userModel;
    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var session = require('express-session');
    var cookieParser = require('cookie-parser');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    /*
    app.use(cookieParser());
    app.use(session({
        secret: 'This is a secret',
        resave: true,
        saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    */

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));

    passport.use('local', new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:userId', findUserById);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post('/api/login',passport.authenticate('local'), login);
    app.get('/api/loggedin',loggedIn);
    app.post('/api/logout',logout);
    app.post('/api/register',register);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook',
        {successRedirect: '/assignment/#/user', failureRedirect: '/assignment/#/login'}));



    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user && bcrypt.compareSync(password,user.password))
                        done(null,user);
                    else
                        done(null,false);
                },
                function(error){
                    done(err);
                }
            );
    }

    function facebookLogin(token, refreshToken, profile, done){
        userModel
            .findFacebookUser(profile.id)
            .then(
                function(fbuser){
                    if(fbuser) {
                        return done(null, fbuser);
                    }
                    else {
                        fbuser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName,
                            }
                        };
                        return userModel
                            .createUser(fbuser)
                            .then(
                                function(user){
                                    done(null,user);
                                }
                            );
                    }
                }
            )
    }



    function loggedIn(req,res){
        if(req.isAuthenticated()){
            res.json(req.user);
        }
        else {
            res.send('0');
        }
    }


    function serializeUser(user, done) {
        // console.log("in serialize "+user);

        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function login(req, res) {
            var user= req.user;
            res.json(user);
        }



    function logout(req,res){
        req.logout();
        res.send(200);
    }

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


    function register(req,res){
        var username = req.body.username;
        var password = req.body.password;

        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user)
                    {
                        res.status(400).send("Oops !! Username already exists..");
                        return;
                    }
                    else {
                        var user = req.body
                        user.password = bcrypt.hashSync(user.password);
                        return userModel
                            .createUser(user);
                    }
                },
                function(err){
                    res.status(400).send(err);
                    return;
                }
            )
            .then(
                function(user){
                    if(user) {
                        req.login(user,function(err){
                            if(err){
                                res.status(400).send(err);
                            }
                            else {
                                res.json(user);
                            }
                        })
                    }
                }
            )
    }


    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if(username&&password){
            findUserByCredentials(username,password,req,res);
        }
        else if(username){
            findUserByUsername(username,res);
        }
        else {
            res.send(req.user);
        }
       //  console.log("mmt");
       //  var params = req.params;
       //  var query = req.query;
       // if(query.password && query.username) {
       //     findUserByCredentials(req, res);
       //  } else if(query.username) {
       //      findUserByUsername(req, res);
       //  }
    }

    function findUserByCredentials(username, password, req, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){
                    // console.log(req.session);
                    req.session.createUser=user;
                    res.json(user);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
    }

    function findUserByUsername(username, res) {
        // var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
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