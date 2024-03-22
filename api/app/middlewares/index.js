const authJwt = require("./authJwt.middleware");
const verifyUser = require("./verifyUser.middleware");
const verifyGroup = require("./verifyGroup.middleware");
const verifyClas = require("./verifyClas.middleware");

module.exports = {
  authJwt,
  verifyUser,
  verifyGroup,
  verifyClas,
};