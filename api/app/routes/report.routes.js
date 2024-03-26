const controller = require("../controllers/report.controller");

module.exports = function(app) {
  app.get(
    "/dominicall/report",
    [],
    controller.report
  );

  app.get(
    "/dominicall/report/offer",
    [],
    controller.reportOffers
  );

  app.get(
    "/dominicall/report/calendar",
    [],
    controller.reportCalendars
  );
};