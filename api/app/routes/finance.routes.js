const { authJwt, verifyClas, verifyGroup } = require("../middlewares");
const controller = require("../controllers/finance.controller");

module.exports = function(app) {
  app.post(
    "/dominicall/finance",
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup
    ],
    controller.create
  );
  
  app.get(
    '/dominicall/finance',
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup
    ],
    controller.getAll
  );

  app.delete(
    '/dominicall/finance/:id',
    [
      authJwt.verifyToken,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyId
    ],
    controller.remove
  );
};