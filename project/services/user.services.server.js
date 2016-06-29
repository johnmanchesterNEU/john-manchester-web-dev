var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
//var GoogleStrategy = require('passport-google-oauth20').Strategy;
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// /
//flickr-oauth-and-upload


var FlickrStrategy = require('passport-flickr').Strategy;
//var FlickrStrategy = require('passport-flickr').Strategy;
//var session = require('express-session');
//app.use(passport.initialize());
//var GoogleStrategy2 = require('passport-google').Strategy;


//var GoogleStrategy2 = require('passport-google-oauth').OAuth2Strategy;

// maps api key AIzaSyCBKNUZMB4rHw4NOz2-3XyV_6MkWnfZHBQ

module.exports = function (app, models) {
    var userModel = models.userModel;

    //flickr configuration
    var flickrConfig = {
        consumerKey: process.env.FLICKR_CONSUMER_KEY,
        consumerSecret: process.env.FLICKR_CONSUMER_SECRET,
        callbackURL: process.env.FLICKR_CALLBACK_URL,
        passReqToCallback: true
    }



    //{api_key:process.env.FLICKR_CONSUMER_KEY, secret:process.env.FLICKR_CONSUMER_SECRET, permissions: "delete"}

    var flickrConfig2 = {
        api_key: process.env.FLICKR_CONSUMER_KEY,
        secret: process.env.FLICKR_CONSUMER_SECRET,
        callback: process.env.FLICKR_CALLBACK_URL,
        permissions: "delete",
        callback: process.env.FLICKR_CALLBACK_URL
    }

   










    app.get("/project2/auth/flickr/username/:uid/password/:pid", function (req, res, next) {

        console.log(req.params.uid);
        console.log(req.params.pid);

        var state = {
            username: req.params.uid,
            password: req.params.pid
        }

        req.session.state = state;


     // console.log(request);
           //.then(function(token){
            //   console.log(token);

//        }, function (error) {
  //             res.statusCode(400).send("Could not authenticate.")
    //       });
        //console.log(requestToken)
        // in Oauth2, its more like : args.scope = reqId, and args as authenticate() second params
        Flickr.authenticate(flickrConfig2, function(sucess){
            console.log(success); return success;
        },function(error){console.log(error); return error;})(req, res, next);
    });







    app.put("/pro/follow/", follow);
    function follow(req, res){
        var follow = req.body;

        console.log(follow);
        userModel
            .follow(follow)
            .then(function (succes) {
                res.status(200).send("Following user");
            }, function(error){
                res.status(400).send("Cannot follow user" )
            })
        }

    app.get("/pro/getusers", getUsers);
    function getUsers(req, res) {
       // var userId = req.params.userId;
        // console.log(req.session.currentUser);
        //console.log(newUser);
        userModel
            .getUsers()
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("Could not find user on server");
                })}











    app.delete("/api/user/:userId", deleteUser);
    // sends a request to delete a user in the database given an ID
    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(
                function (user) {
                    req.logOut();
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(error.statusCode).send("Could not delete the user on the server");
                })
    }



    app.put("/pro/flickr/:userId", updateUser);
    //Sends a request to update the user at the database
    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        // user.password = bcrypt.hashSync(user.password);
        userModel
            .updateUser(userId, user)
            .then(
                function (user) {
                    console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.status(error.statusCode).send("Could update the user on the server.");
                })
    }


    app.put("/pro/user/:userId", updateUser);
    //Sends a request to update the user at the database
    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        //user.local.password = bcrypt.hashSync(user.password);
        userModel
            .updateUser(userId, user)
            .then(
                function (user) {
                    console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.status(error.statusCode).send("Could update the user on the server.");
                })
    }






    //unlink flickr account
    app.get("/pro/unflickr/:id", unflickr);
    function unflickr(req,res) {
        var userId = req.params.id;

        userModel
            .unflickr(userId)
            .then(function (user) {
                res.status(200).send("Flickr was unlinked");
            }, function (error) {
                res.status(400).send("Could not unlink Flickr account");
            })
    }



    //unregrister

    app.get("/pro/unregister/:id", unregister);

    function unregister(req, res) {
        var userId = req.params.id;
        userModel
            .deleteUser(userId)
            .then(function (user) {
                res.status(200).send("User was unregistered");
            }, function (error) {
                res.status(400).send("Could not unregister");
            })
    }












    app.get("/api/user/:userId", findUserById);
    function findUserById(req, res) {
        var userId = req.params.userId;
        // console.log(req.session.currentUser);
        //console.log(newUser);
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("Could not find user on server");
                })}





    app.get("/api/loggedIn", loggedIn);
    app.post("/api/logout", logout);


    var localConfig = {
        userNameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    }


    // process the signup form
    app.post('/pro/signup', passport.authenticate('local-signup', {
        successRedirect : '/project/#/profile', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
    }));


    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            // user model must be in proper format to work
            console.log("user: " + req.user);
            userModel
                .saveUser(req.user)
                .then(function (user) {
                    console.log("result: " + user);
                    return done(null,user);
                }, function (error) {
                    // throws error if user already exists
                    return done(error);
                })
        }));





    app.post('/project/register', register);


    function register(req, res) {
        console.log(req.body);


        req.body.password = bcrypt.hashSync(req.body.password);
        var user = {"local" : req.body};
        console.log(user);

        userModel.register(user).then(
            function (newUser) {
                req.login(newUser, function (err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json(newUser);
                    }
                })
            },
            function (error) {
                res.status(400).send("Can register user");
            })

    }


    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    };

    app.get('/project/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get('/project/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/'
        }));





    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOKP_CALLBACK_URL
    }

    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));

    app.get("/project/auth/facebook", passport.authenticate('facebook'));
    app.get("/project/auth/facebook/callback", passport.authenticate('facebook', {
        successRedirect: '/project/#/profile',
        failureRedirect: '/project/#/login'
    }));


    passport.use(new GoogleStrategy(googleConfig, googleStrategy));


    function facebookLogin(token, refreshToken, profile, done) {
        console.log(profile);
        userModel
            .findFacebookUser(profile.id)
            .then(
                function (facebookUser) {
                    if (facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function (user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );
    }


    function googleStrategy(request, token, refreshToken, profile, done) {
        //console.log(request);
        //console.log(profile);
        // if the user is not already logged in
        if (!request.user) {
            userModel
                .findUserByGoogleId(profile.id)
                .then(function (googleUser) {
                        if (googleUser) {
                            console.log("found google");
                            return done(null, googleUser);
                        } else {
                            console.log("no google");
                            // grab the json object for easy parsing
                            var pro = profile._json;

                            googleUser = {
                                google: {
                                    token: token,
                                    id: profile.id,
                                    email: profile.emails[0].value
                                }
                            }

                            if (!googleUser.local) {
                                googleUser.local = {
                                    username: profile.emails[0].value,
                                    firstName: pro.name.givenName,
                                    lastName: pro.name.familyName,
                                    email: profile.emails[0].value
                                }
                            }

                            userModel
                                .updateGoogle(googleUser)
                                .then(function (user) {
                                        return done(null, user);
                                    },
                                    function (error) {
                                        return done(error);
                                    })

                        }
                    },
                    function (error) {
                        return done(error);
                    })
        } else {
            // user already exists and is logged in
            var user = request.user;

            user.google.id = profile.id;
            user.google.token = token;
            user.google.email = profile.emails[0].value;

            userModel
                .updateGoogle(user)
                .then(function (user) {
                    return done(null, user);
                }, function (error) {
                    return done(error, user);
                })
        }


        //var pro = profile._json;

        //  console.log(profile.id);
        // console.log(pro.id);
        // console.log(pro.name.givenName);
        // console.log(pro.name.familyName);
        // console.log(pro.gender);
        // console.log(profile.emails[0].value);


        //return done(null, profile);
    }


    /*  app.get('/project/auth/flickr/',
     passport.authenticate('flickr'));*/

    app.get("/project/auth/flickr/username/:uid/password/:pid", function (req, res, next) {

        console.log(req.params.uid);
        console.log(req.params.pid);

        var state = {
            username: req.params.uid,
            password: req.params.pid
        }

        req.session.state = state;
        // in Oauth2, its more like : args.scope = reqId, and args as authenticate() second params
        passport.authenticate('flickr')(req, res, next);
    });


    app.get('/project/auth/flickr/callback/',
        passport.authenticate('flickr', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));

    // If we are already logged in and not connected to flickr
    app.get('/project/connect/flickr', passport.authorize('flickr'));
    app.get('/project/connect/flickr/callback',
        passport.authorize('flickr', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    passport.use(new FlickrStrategy(flickrConfig, FlickrLogin));
    function FlickrLogin(req, token, tokenSecret, profile, done) {
        //console.log(req);

      //  console.log(req);
        //console.log(done);
        console.log(profile);
        console.log(token);
        // var flickrUser = new userModel();

        // We need to exchange or auth token for an access token
        // because flickr is annoying like that

       // console.log(req.query.oauth_verifier);
        //flickrConfig = {
      //  consumerKey: process.env.FLICKR_CONSUMER_KEY,
        //    consumerSecret
     /*   var options = {
            flickrConsumerKey : flickrConfig.consumerKey,
            flickrConsumerKeySecret : flickrConfig.consumerSecret,
            oauthToken: token,
            oauthTokenSecret : tokenSecret,
            oauthVerifier: req.query.oauth_verifier
            
        }


        console.log("TOKEN?");
      // console.log(flickrApi.useRequestTokenToGetAccessToken(options));

        var url = flickrApi.accessURL(options);




        var options = {
            flickrConsumerKey : flickrConfig.consumerKey,
            flickrConsumerKeySecret : flickrConfig.consumerSecret,
            oauthToken: token,
            oauthTokenSecret : tokenSecret,
            oauthVerifier: req.query.oauth_verifier

        }
        
        
        
        
        
        var access = flicker.callApiMethod()
        

        console.log(url);

        console.log(profile);*/


        var fullName = profile.fullName.split(" ");
        var newUser = {
            "local": {
                "username": req.session.state.username,
                "password": bcrypt.hashSync(req.session.state.password),
                "firstName": fullName[0],
                "lastName": fullName[1]
            },
            "flickr": {
                "id": profile.id,
                "token": token,
                "tokenSecret":tokenSecret,
                "displayName": profile.displayName
            }
        };

        

        userModel.saveFlickr(newUser).then(
            function (flickrUser) {
                console.log("saved: " + flickrUser);
                return done(null, flickrUser);
            }, function (error) {
                console.log(error);
                //You can not override another user name
                return done(error);
            });
        ///console.log(flickrUser);
    }

    //To test if your username exists
    app.get("/unique/:user", findUniqueUsername);


    function findUniqueUsername(req, res) {
        var username = req.params.user;  //req.query['username'];
        // console.log("hey " + username);
        // console.log(username);
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user === null) {
                        // console.log("unique");
                        return res.send(true);
                    } else {
                        // console.log("not");
                        return res.send(false);
                    }

                    //   console.log("wassup");
                    //console.log(user);
                    //return res.json(user);
                },
                function (err) {
                    console.log(err);
                    return res.send(false);
                }
            )
    }


    function authenticate(req, res, next) {
        console.log(req.user);
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            next();
        } else {
            res.send(403);
        }
    }



    function loggedIn(req, res) {
        console.log("here " + req);
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send(false);
        }
    }


    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }



    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

};


