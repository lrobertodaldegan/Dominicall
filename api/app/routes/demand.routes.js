const { authJwt, verifyUser } = require("../middlewares");
const controller = require("../controllers/demand.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      'Access-Control-Allow-Credentials',
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/dominicall/demand", 
    [authJwt.verifyToken],
    controller.demands
  );

  app.get(
    "/dominicall/demand/institution", 
    [authJwt.verifyToken, verifyUser.justInstitution],
    controller.institutionDemands
  );

  app.get(
    "/dominicall/demand/:demandId", 
    [authJwt.verifyToken, verifyUser.justInstitution],
    controller.institutionDemand
  );

  app.post(
    "/dominicall/demand",
    [authJwt.verifyToken, verifyUser.justInstitution],
    controller.newDemand
  );

  app.put(
    "/dominicall/demand/:demandId",
    [authJwt.verifyToken, verifyUser.justInstitution],
    controller.updateDemand
  );

  app.delete(
    "/dominicall/demand/:demandId",
    [authJwt.verifyToken, verifyUser.justInstitution],
    controller.deleteDemand
  );
};