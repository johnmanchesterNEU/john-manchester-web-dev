var express = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');




// flickr Key
//c778ef301f9d7fd8fb70c5dc8cfe1bf9
//flickr secret
//c7d4b19e14debcc7

var app = express();

var bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(session({ secret: "sdfsdfsdf" }));
//console.log(process.env.SECRET);
app.use(session({ secret: "youshallnotpass",
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());



// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require ("./test/app.js")(app);


var project = require("./project/app");
//var project = require("./public/project/project.js")
//var project = require("./public/project/app");


//assignment(app);
project(app);



var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);