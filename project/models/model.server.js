module.exports = function(){

    var mongoose = require('mongoose');
    dbURI = 'mongodb://localhost/summer';
    mongoose.connect(dbURI);
   // var userModel = require("./user/user.model.server.js")();
   // var websiteModel = require("./website/website.model.server")();
  //  var pageModel = require("./page/page.model.server")();
   // var widgetModel = require("./widget/widget.model.server")();

   // console.log("HEY");

    var models  = {
    //s    userModel: require("./user/user.model.server.js")(),
      //  websiteModel: require("./website/website.model.server.js")(),
      //  pageModel: require("./page/page.model.server")(),
      //  widgetModel: require("./widget/widget.model.server")()
    };


    // Define connection events
    mongoose.connection.on('connected', function () {
        console.log('Mongoose connected to ' + dbURI);
    });

    mongoose.connection.on('error', function (err) {
        console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose disconnected');
    });


    return models;
}

/*
 var connectionString = 'mongodb://127.0.0.1:27017/test';

 if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
 connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
 process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
 process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
 process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
 process.env.OPENSHIFT_APP_NAME;
 }

 */