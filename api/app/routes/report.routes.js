const controller = require("../controllers/report.controller");

module.exports = function(app) {
  app.get(
    "/dominicall/report",
    [],
    controller.report
  );

  app.get(
    "/dominicall/report/finance",
    [],
    controller.reportFinance
  );

  app.get(
    "/dominicall/report/students",
    [],
    controller.reportStudents
  );

  app.get(
    "/dominicall/report/calendar",
    [],
    controller.reportCalendars
  );
};