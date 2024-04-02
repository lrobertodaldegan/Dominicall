const util = require('../utils');
const db = require("../models");
const Finance = db.finance;

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  `Ops!` });
    return;
  }
}

exports.create = (req, res) => {
  if(req.body.value && req.body.type){
    const fin = new Finance({
      value:req.body.value,
      title:req.body.title,
      type: req.body.type,
      group: req.groupId
    });

    if(!req.body.dt)
      fin.dt = util.date.dateLabel();
    else
      fin.dt = req.body.dt;
    
    fin.save().then(f => {
      res.status(201).send({message:'Item registrado com sucesso!'});
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message: 'Informe os dados necessário para realizar a operação!'});
  }
}

exports.remove = (req, res) => {
  Finance.deleteOne({_id:req.params.id})
  .then(() => {
    res.status(200).send({message:'Operação realizada com sucesso!'});
  }).catch(err => errorHandler(err, res));
}

exports.getAll = (req, res) => {
  Finance.find({group: req.groupId})
  .then(fins => {
    let status = fins && fins.length > 0 ? 200 : 204;

    res.status(status).send({finances: fins});
  }).catch(err => errorHandler(err, res));
}