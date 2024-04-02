const { authJwt, verifyUser } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.post(
    "/dominicall/user/forgot",
    [],
    controller.sendResetPassword
  );

  app.post(
    "/dominicall/user/code",
    [],
    controller.codeValidation
  );

  app.post(
    "/dominicall/user",
    [
      authJwt.verifyToken,
      verifyUser.exists,
    ],
    controller.resetPass
  );

  app.get(
    '/dominicall/users',
    [
      authJwt.verifyToken,
    ],
    controller.searchUsers
  );

  app.put(
    '/dominicall/user',
    [
      authJwt.verifyToken,
      verifyUser.exists,
    ],
    controller.update
  );
};