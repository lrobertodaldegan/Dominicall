const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.get('Authorization');

  if (!token || !group)
    return res.status(403).send({ message: "Acesso negado!" });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Sem autorização!",
      });
    }

    req.userId = decoded.id;

    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;