const { verifyUser, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      'Access-Control-Allow-Credentials',
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/dominicall/auth/v/signup",
    [
      verifyUser.checkDuplicateEmail,
    ],
    controller.voluntairSignUp
  );

  app.post(
    "/dominicall/auth/i/signup",
    [
      verifyUser.checkDuplicateEmail,
    ],
    controller.institutionSignUp
  );

  app.post(
    "/dominicall/auth/refresh",
    [
      authJwt.verifyToken,
    ],
    controller.refresh
  );

  app.post("/dominicall/auth/signin", controller.signin);
  app.post("/dominicall/auth/signout", controller.signout);
};