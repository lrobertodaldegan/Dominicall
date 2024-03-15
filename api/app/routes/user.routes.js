const { authJwt, verifyUser } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept",
      'Access-Control-Allow-Credentials',
    );
    next();
  });

  app.get(
    '/dominicall/user',
    [authJwt.verifyToken],
    controller.userInfo
  );

  app.put(
    "/dominicall/user",
    [authJwt.verifyToken, verifyUser.checkDuplicateEmail],
    controller.updateUser
  );

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
};