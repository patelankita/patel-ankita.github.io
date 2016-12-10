module.exports = function(app) {

    var model = require("./model/models.server")();
    require("./services/user.service.server.js")(app , model);
    require("./services/search.service.server.js")(app , model);
    require("./services/result.service.server.js")(app , model);

};