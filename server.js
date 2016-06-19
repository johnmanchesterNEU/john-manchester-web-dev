var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//process.env.SESSION_SECRET = "youshallnotpass";
//process.env.FACEBOOK_CLIENT_ID = "516453845205090";
//process.env.FACEBOOK_CLIENT_SECRET = "cf6a6fd03f723840d4f3a1f381ea4266";
//console.log(process.env.SESSION_SECRET);

app.use(cookieParser());
app.use(session({
    secret:  process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
//app.use(session({ secret: process.env.SESSION_SECRET }))
//app.use(session({ secret: "abc123" }));


app.use(passport.initialize());
app.use(passport.session());
//app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//app.use(passport.session());
//var models =


//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var assignment = require("./assignment/app.js");

//var project = require("./project/app");
//var project = require("./public/project/project.js")
//var project = require("./public/project/app");


assignment(app);
//project(app);
//require("./assignment/models/model.server.js")();

//var assignment = require("./assignment/app");
//assignment(app);
//project(app);
//require("./assignment/app.js")(app);

app.listen(port, ipaddress);