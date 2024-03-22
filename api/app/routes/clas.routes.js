const { authJwt, verifyClas, verifyGroup, verifyUser } = require("../middlewares");
const controller = require("../controllers/clas.controller");

module.exports = function(app) {
  app.post(
    "/dominicall/class",
    [
      authJwt.verifyToken,
      verifyUser.justCoord,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyDuplicationInGroup
    ],
    controller.create
  );

  app.put(
    "/dominicall/class",
    [
      authJwt.verifyToken,
      verifyUser.justCoord,
      verifyGroup.verifyUserGroup,
      verifyClas.verifyDuplicationInGroup
    ],
    controller.update
  );

  app.delete(
    "/dominicall/class/:id",
    [
      authJwt.verifyToken,
      verifyUser.justCoord,
      verifyGroup.verifyUserGroup,
    ],
    controller.remove
  );
};