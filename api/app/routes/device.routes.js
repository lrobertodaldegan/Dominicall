const { authJwt, verifyUser } = require("../middlewares");
const controller = require("../controllers/device.controller");

module.exports = function(app) {
  app.get(
    '/dominicall/user/devices',
    [authJwt.verifyToken],
    controller.userDevices
  );

  app.post(
    '/dominicall/user/device',
    [authJwt.verifyToken],
    controller.deviceValidation
  );
};