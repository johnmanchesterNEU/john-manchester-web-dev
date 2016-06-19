module.exports = function(app) {

    //console.log("included");
    var models = require("./models/model.server.js")();

    require("./services/user.services.server")(app, models);
  //  require("./services/website.services.server")(app, models);
   // require("./services/page.services.server")(app,models);
    //require("./services/widget.services.server")(app, models);

};