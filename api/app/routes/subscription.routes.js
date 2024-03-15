const { authJwt, verifyUser } = require("../middlewares");
const controller = require("../controllers/subscription.controller");

module.exports = function(app) {
  //consultar inscricoes realizadas pelo voluntario
  app.get(
    "/dominicall/subscription", 
    [authJwt.verifyToken, verifyUser.justVoluntair],
    controller.voluntairSubscriptions
  );
  //consutlar inscricoes nas demandas da instituicao
  app.get(
    "/dominicall/subscription/institution", 
    [authJwt.verifyToken, verifyUser.justInstitution],
    controller.subscriptionsByInstitutionDemands
  );
  //nova inscricao
  app.post(
    "/dominicall/subscription",
    [authJwt.verifyToken, verifyUser.justVoluntair],
    controller.submitSubscription
  );
  //aceitar inscricao
  app.put(
    "/dominicall/subscription/:subscriptionId",
    [authJwt.verifyToken, verifyUser.justInstitution],
    controller.acceptSubscription
  );
  //cancelar inscricao
  app.delete(
    "/dominicall/subscription/:subscriptionId",
    [authJwt.verifyToken, verifyUser.justVoluntair],
    controller.cancelSubscription
  );
};