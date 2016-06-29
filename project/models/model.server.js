module.exports = function () {

    var mongoose = require('mongoose');
    dbURI = 'mongodb://localhost/summer';
    mongoose.connect(dbURI);

    var models = {
        userModel: require("./user/user.model.server.js")(),
        mediaModel: require("./media/media.model.server")(),
        commentModel: require("./comment/comment.model.server")(),
        placeModel: require("./place/place.model.server")(),
        tripModel: require("./trip/trip.model.server")()
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