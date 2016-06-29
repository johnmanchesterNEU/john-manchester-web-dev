module.exports = function(app) {

    //console.log("included");
    var models = require("./models/model.server.js")();

    require("./services/user.services.server")(app, models);
    require("./services/photo.services.server")(app, models);
    require("./services/test.services.server")(app, models);
    require("./services/trip.service.server")(app, models);
    require("./services/places.services.server")(app, models);
  //  require("./services/website.services.server")(app, models);
   // require("./services/page.services.server")(app,models);
    //require("./services/widget.services.server")(app, models);

};