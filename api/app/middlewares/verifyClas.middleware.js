const db = require("../models");
const Clas = db.clas;
const Event = db.event;
const Visitor = db.visitor;
const Student = db.student;

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
    return res.status(400).send({ message: "Informe uma turma para realizar a operação!" });
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

verifyEventDuplication = (req, res, next) => {
  Event.findOne({
    dt: req.body.dt,
    clas: req.body.classId,
    name: req.body.name
  })
  .exec()
  .then(ev => {
    if(ev)
      return res.status(404).send({ message: "Já existe um evento assim para esta turma!" });

    next();
  }).catch(err => errorHandler(err, res));
}

verifyVisitorDuplication = (req, res, next) => {
  Visitor.findOne({
    dt: req.body.dt,
    clas: req.body.classId,
    name: req.body.name
  })
  .exec()
  .then(ev => {
    if(ev)
      return res.status(404).send({ message: "Já existe um(a) visitante assim cadastrado(a)!" });

    next();
  }).catch(err => errorHandler(err, res));
}

verifyStudentDuplication = (req, res, next) => {
  Student.findOne({
    clas: req.body.classId,
    name: req.body.name
  })
  .exec()
  .then(ev => {
    if(ev)
      return res.status(404).send({ message: "Já existe um(a) estudante assim matriculado para essa turma!" });

    next();
  }).catch(err => errorHandler(err, res));
}

module.exports = {
  verifyDuplicationInGroup,
  verifyClassId,
  verifyDt,
  verifyId,
  verifyEventDuplication,
  verifyVisitorDuplication,
  verifyStudentDuplication,
}