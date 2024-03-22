const { verifyUser } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.post(
    "/dominicall/auth/signup",
    [
      verifyUser.checkDuplicateUsername,
    ],
    controller.signUp
  );

  app.post("/dominicall/auth/signin", controller.signin);
  app.post("/dominicall/auth/signout", controller.signout);
};