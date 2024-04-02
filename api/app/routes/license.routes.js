const { authJwt, verifyClas } = require("../middlewares");
const controller = require("../controllers/license.controller");

module.exports = function(app) {
  app.post(
    "/dominicall/license",
    [
      authJwt.verifyToken,
    ],
    controller.requestLicense
  );
  
  app.get(
    '/dominicall/license',
    [
      authJwt.verifyToken,
    ],
    controller.licenseStatus
  );

  app.put(
    '/dominicall/license',
    [
      authJwt.verifyToken,
    ],
    controller.grantLicense
  );

  app.delete(
    '/dominicall/license/:id',
    [
      authJwt.verifyToken,
      verifyClas.verifyId
    ],
    controller.revokeLicense
  );
};