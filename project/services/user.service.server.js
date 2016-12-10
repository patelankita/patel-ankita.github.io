module.exports = function(app , model) {

    var userModel = model.projectUserModel;

    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth20').Strategy;

    app.post("/api/project/user", createUser);
    app.post("/api/project/login",passport.authenticate('local'), login);
    app.post("/api/project/logout",logout);
    app.post("/api/project/register",register);
    app.get("/api/searchUsers/:searchtext",searchUsers);
    app.get("/api/project/loggedin",loggedIn);
    app.get("/api/project/user", getUsers);

    app.get("/api/project/user/:uid", findUserByID);

    app.put("/api/project/user/:uid", updateUser);
    app.delete("/api/project/user/:uid",deleteUser);

    app.get('/auth/project/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/project/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));

    passport.use('local', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    }

    passport.use('google', new GoogleStrategy(googleConfig, googleStrategy));


    function googleStrategy(token, refereshToken, profile, done) {
        console.log("google profile "+profile);
        userModel
            .findGoogleUser(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
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


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserByID(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function loggedIn(req,res){
        if(req.isAuthenticated()){
            res.json(req.user);
        }
        else {
            res.send('0');
        }
    }

    function localStrategy(username,password,done){
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


    function login(req, res) {
        var user= req.user;
        res.json(user);
    }


    function logout(req,res){
        req.logout();
        res.send(200);
    }

    function getUsers(req,res){
        var username = req.query.username;
        var password = req.query.password;

        if(username&&password){
            findUserByCredentials(username,password,req,res);
        }
        else
        if(username){
            findUserByUsername(username,res);
        }
        else
            res.send(users);
    }

    function findUserByID(req,res){
        var uid = req.params.uid;

        console.log(req.session.createUser);

        userModel
            .findUserByID(uid)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    };

    function findUserByUsername(username, res){
        for(var i in users){
            if(users[i].username === username)
            {
                res.json(users[i]);
                return;
            }
        }
        res.json();
    }

    function createUser(req , res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function(user) {
                    console.log(user);
                    res.json(user);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            )
    }

    function deleteUser(req, res) {
        var id = req.params.uid;

        userModel
            .deleteUser(id)
            .then(
                function(stats){
                    console.log(stats);
                    res.send(200);
                },
                function(err){
                    res.statusCode(404).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.uid;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );

    }

    function findUserByCredentials(username, password ,req, res) {

        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){
                    console.log(req.session);
                    req.session.createUser=user;
                    res.json(user);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
    }

    function searchUsers(req,res){
        var searchtext = req.params.searchtext;

        userModel
            .searchUsersByUsername(searchtext)
            .then(
                function (users) {
                    if(users){
                        res.json(users);
                    }
                    else{
                        res.statusCode(404);
                    }
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
    }
};