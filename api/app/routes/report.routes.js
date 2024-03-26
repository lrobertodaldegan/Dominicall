const { authJwt } = require("../middlewares");
const controller = require("../controllers/report.controller");

module.exports = function(app) {
  app.get(
    "/dominicall/report",
    [],
    controller.report
  );
};