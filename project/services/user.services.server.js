var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//var GoogleStrategy = require('passport-google-oauth2').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FlickrStrategy = require('passport-flickr').Strategy;


//var GoogleStrategy2 = require('passport-google').Strategy;


//var GoogleStrategy2 = require('passport-google-oauth').OAuth2Strategy;

// maps api key AIzaSyCBKNUZMB4rHw4NOz2-3XyV_6MkWnfZHBQ

module.exports = function (app, models) {
    //var userModel = models.userModel;

    var flickrConfig = {
        consumerKey     : process.env.FLICKR_CONSUMER_KEY,
        consumerSecret : process.env.FLICKR_CONSUMER_SECRET,
        callbackURL  : process.env.FLICKR_CALLBACK_URL
    }


  //  console.log(process.env.FLICKR_CONSUMER_KEY + " " + process.env.FLICKR_CONSUMER_SECRET + " " + process.env.FLICKR_CALLBACK_URL);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOKP_CALLBACK_URL,
        profileFields: ['id', 'first_name', 'last_name', 'birthday','location', 'emails']
    };



    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };


    //console.log(process.env.GOOGLE_CLIENT_ID + " " + process.env.GOOGLE_CLIENT_SECRET + " " + process.env.GOOGLE_CALLBACK_URL);


    app.get('/project/auth/flickr', passport.authenticate('flickr'));
    //app.get('/project/auth/flickr',
     //   passport.authenticate('flickr'),
      //  function(req, res){
            // The request will be redirected to Flickr for authentication, so this
            // function will not be called.
       // });

  /*  app.get('/project/auth/flickr/callback',
        passport.authenticate('flickr', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
*/
  //  app.get('/project/auth/flickr', passport.authenticate('flickr'));
    app.get('/project/auth/flickr/callback',
        passport.authenticate('flickr', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));



    //{ scope:
     //   [ 'https://www.googleapis.com/auth/plus.login',
      //      , 'https://www.googleapis.com/auth/plus.profile.emails.read' ]
 //   app.get('/project/auth/google', passport.authenticate('google',    { scope:
  //      [ 'https://www.googleapis.com/auth/plus.login',
   //         , 'https://www.googleapis.com/auth/plus.profile.emails.read' ]}));

     app.get('/project/auth/google', passport.authenticate('google',  {scope: ['profile','email']}));
    app.get('/project/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));
/*

    app.get("/auth/google", passport.authenticate('google', {scope:['profile', 'email']}));
    app.get("/auth/google/callback", passport.authenticate('google', {
        successRedirect: '/project/#/profile/',
        failureRedirect: '/project/#/login'
    }));
*/

    //Authenticate facebook user
    app.get("/project/auth/facebook", passport.authenticate('facebook', { authType: 'rerequest', scope: ['public_profile','user_birthday', 'user_location', 'email'] }));
    //passport.authenticate('facebook', {authType: 'rerequest', scope: 'public_profile,user_birthday,user_location,email'}));

//    app.get("/project/auth/facebook", passport.authenticate('facebook', {scope:'email'}));
    app.get("/project/auth/facebook/callback", passport.authenticate('facebook', {
        successRedirect: '/#/register/',
        failureRedirect: '/#/login'
    }));


    //app.get('/profile', authenticate, function(req, res) {
    //    console.log(req);
    //    res.render('/profile/' + req.user._id);
    //});



   // app.get("/auth/facebook/callback", passport.authenticate('facebook', function(err,user,info) {
   // }));



    /*app.get('/profile', authenticate, function(req, res) {
        console.log(reg.user.id);
        res.render('/profile/', {
            user : req.user.id // get the user out of session and pass to template
        });
    });*/

    app.post("/api/register", register);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/logout", logout);

    app.post  ('/api/login', passport.authenticate('login'), login);

    app.post("/api/logout", logout);

    app.get("/api/user", findUserByCredentials);
    //app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user?username=username", findUserByUsername);
    app.post("/api/user", createUser);
    app.get("/api/users", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


    passport.use('login', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));
    //passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));


//    passport.use('google', new GoogleStrategy(googleConfig, googleLogin));

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile);

        var pro = profile._json;

      //  console.log(profile.id);
        console.log(pro.id);
        console.log(pro.name.givenName);
        console.log(pro.name.familyName);
        console.log(pro.gender);
        console.log(profile.emails[0].value);


        return done(null, profile);
    }


   // passport.use('flickr', new FlickrStrategy(flickrConfig, FlickrStrategy));


  //  passport.use(new FlickrStrategy(flickrConfig,
    //        function(token, tokenSecret, profile, done) {
        /*User.findOrCreate({ flickrId: profile.id }, function (err, user) {
         return done(err, user);
         }
         );*/
      //        console.log(profile);
      //     }
       // ));


    passport.use(new FlickrStrategy(flickrConfig, FlickrLogin));


      function FlickrLogin (token, tokenSecret, profile, done){
          console.log(profile);
          //profile.id
          //profile.displayName
          console.log(profile.id);
          var name = profile.fullName.split(" ");
          var firstName = name[0];
          var lastName = name[1];

          console.log(firstName);
          console.log(lastName);
          return done(null, profile);
     }













   // passport.use(new FlickrStrategy(flickrConfig,
    //    function(token, tokenSecret, profile, done) {
            /*User.findOrCreate({ flickrId: profile.id }, function (err, user) {
             return done(err, user);
             }
             );*/
      //      console.log(profile);
     //   }
    //));

//    passport.use(new FlickrStrategy({
 //           consumerKey: "9eae9e2a0a7438976a234fc16ff535fa",
  //          consumerSecret: "111000dbf1b37388",
   //         callbackURL: "http://127.0.0.1:3000/auth/flickr/callback"
    //    },
     //   function(token, tokenSecret, profile, done) {
            /*User.findOrCreate({ flickrId: profile.id }, function (err, user) {
                return done(err, user);
            }
            );*/
       //     console.log(profile);
    //    }
   // ));





  //  function FlickrStrategy (token, tokenSecret, profile, done){
  //      console.log(profile);
  //  }





//    function googleStrategy(token, refreshToken, profile, done) {
 //       console.log(profile);
        /*userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );*/
   // }









    function facebookLogin(token, refreshToken, profile, done) {
        console.log(profile);
        //get json object for easier parsing
        var pro =  profile._json;

        var id = pro.id;
        console.log(id);
        var firstName = pro.first_name;
        console.log(firstName);
        var lastName = pro.last_name;
       console.log(lastName);

        var locationID = pro.location.id;
        console.log(locationID);



        var locationName = pro.location.name.split(", ");
        var city = locationName[0];
        var state = locationName[1];
        console.log(city);
        console.log(state);

        var email = pro.email;

        console.log(email);
        var birthday = new Date(pro.birthday);
        console.log(birthday);
        //var id = profile.id;
        //var birthday =  new Date(profile.birthday);
        //var firstName = profile.name.givenName;
        //var lastName = profile.name.familyName;
        return done(null, profile);
       /* userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g,''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function(user) {
                                    done(null, user);
                                }
                            );
                    }
                }
            );*/
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        done(null, user);
      /*  userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );*/
    }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }


    function authenticate(req, res, next) {
        console.log(req.user);
        console.log(req.isAuthenticated());
        if(req.isAuthenticated()) {
            next();
        } else {
            res.send(403);
        }
    }



    function comparePassword(password, userPassword) {
        bcrypt.compare(password, userPassword, function (err, isPasswordMatch) {
            if (err) {
                return err;
            }else{
                console.log("result: " +isPasswordMatch)
              return isPasswordMatch;
            }
        });
    }


    function compare(password, userPassword, callback) {
        bcrypt.compare(password, userPassword, callback);
    }




    // yes, no, idk --> server is down
    function localStrategy(username, password, done) {
        console.log(username);
        console.log(password);
        console.log(done);
        //userModel
        //  .findUserByCredentials(username, password)
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                   // console.log("yo " + user);
                    if(user){
                    compare(password, user.password, function(error,result){
                        if(result){
                            console.log("pass " + result);
                            return done(null, user);
                        }else{
                            console.log("fail " + result);
                            return done(null, false);
                        }

                    })}else{
                        return done(null, false);
                    }}
                ,
                function (err) {
                    console.log("err " + err);
                    if (err) {
                        return done(err);
                    }
                }
            );
    }


    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        // var username = req.body.user.username;
        // var password = req.body.user.password;
        userModel
            .createUser(user)
            .then(
                function (user) {
                    console.log(user);
                    if (user) {
                        req.login(user, function (error) {
                            if (error) {
                                console.log(error);
                                res.status(400).send(error);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                }, function (error) {
                    if (error.code == 11000) {
                        // console.log("OOOOO");
                        //res
                        res.status(500).send("User name already exists")
                    } else {
                        //res.statusCode(200);
                        res.status(400).send("An error has occurred");
                    }
                }
            )

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

    /*

     if(user && bcrypt.compareSync(password, user.password)) {
     return done(null, user);
     } else {
     return done(null, false);
     }
     */


    // sends a request to create a user at the database
    function createUser(req, res) {
        var user = req.body;
        // console.log("here: " + user);
        userModel
            .createUser(user)
            .then(
                function (user) {
                    console.log("hit server");
                    //user.verify = user.password;
                    res.json(user);
                    //res.statusCode(200);
                },
                function (error) {
                    //console.log("EEE " + error)
                    if (error.code == 11000) {
                        // console.log("OOOOO");
                        //res
                        res.status(500).send("User name already exists")
                    } else {
                        //res.statusCode(200);
                        res.status(400).send("An error has occurred");
                    }
                }
            );
    }

    // sends a request to delete a user in the database given an ID
    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(error.statusCode).send("Could not delete the user on the server");
                })
    }

    //Sends a request to update the user at the database
    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .updateUser(userId, user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(error.statusCode).send("Could update the user on the server.");
                })
    }

    //Asks the database for some user given id and returns the user
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
                })

        /* var userId = req.params.userId;
         userModel
         .findUserById(userId)
         .then(
         function(user){
         res.send(user);
         },
         function (error) {
         res.status(404).send("User with ID: " + id + " not found");
         }
         )*/
        /* var userId = req.params.userId;
         for (var i in users) {
         if (userId === users[i]._id) {
         res.send(users[i]);
         }
         }
         res.send({});*/
    }

    //Returns all users in the database
    function getUsers(req, res) {
        res.send(userModel.getUsers());
        /*var username = req.query["username"];
         var password = req.query["password"];
         if (username && password) {
         findUserByCredentials(username, password, res);
         } else if (username) {
         findUserByUsername(username, res);
         } else {
         res.send(users);
         }*/
        //res.send({title:"Muahhhahahhaah"});
    }

    //finds a user by a username and password
    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {

                    console.log(req.session);

                    res.json(user);
                },
                function (err) {
                    res.statusCode(404).send(err);
                }
            )
        // for(var i in users) {
        //     if(users[i].username === username && users[i].password === password) {
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function findUserByUsername(username, res) {
        console.log(username);
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {

                    // console.log(req.session);

                    res.json(user);
                },
                function (err) {
                    res.statusCode(404).send(err);
                }
            )

        /*  for (var u in users) {
         if (users[u].username === username) {
         res.send(users[u]);
         return;
         }
         }
         res.send({});*/
    }
};