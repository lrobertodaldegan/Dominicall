const db = require("../models");
const Clas = db.clas;

verifyDuplicationInGroup = (req, res, next) => {
  Clas.findOne({
    group:req.groupId,
    name:req.body.name
  })
  .exec()
  .then(clas => {
    if(clas)
      return res.status(404).send({ message: "Já existe uma turma com esse nome neste grupo!" });

    next();
  }).catch(err => errorHandler(err, res));
};

verifyClassId = (req, res, next) => {
  if(req.query.classId || req.body.classId || req.params.classId)
    next();
  else
    return res.status(400).send({ message: "Informe uma classe para realizar a operação!" });
}

verifyDt = (req, res, next) => {
  if(req.query.dt || req.body.dt)
    next();
  else
    return res.status(400).send({ message: "Informe uma data para realizar a operação!" });
}

verifyId = (req, res, next) => {
  if(req.query.id || req.body.id || req.params.id)
    next();
  else
    return res.status(400).send({ message: "Informe um identificador para realizar a operação!" });
}

module.exports = {
  verifyDuplicationInGroup,
  verifyClassId,
  verifyDt,
  verifyId,
}