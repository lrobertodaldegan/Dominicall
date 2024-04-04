var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

exports.requestLicense = (req, res) => {
  User.findById(req.userId)
  .exec()
  .then(user=> {
    if(!user)
      return res.status(400).send({message: 'Informe dados adequados para realizar a operação!'});

    user.license = 'requested';

    user.save().then(user => {
      try {
        var transporter = nodemailer.createTransport({
          service:'gmail',
          auth: {
            user: config.smtp.email,
            pass: config.smtp.pass,
          },
        });

        transporter.verify().then(console.log).catch(console.error);

        var fMailOptions = {
          from: config.smtp.from,
          to: 'lrobertodaldegan@hotmail.com',
          subject: 'Solicitação de licença',
          text: `Usuário ${user.name} (${user.username}) - ${user._id} solicitou uma nova licença Dominicall!`
        }

        transporter.sendMail(fMailOptions, function(error, info){
          if (error) {
            errorHandler(error, res);
          } else {
            var mailOptions = {
              from: config.smtp.from,
              to: user.email,
              subject: 'Confirmação de pedido',
              text: `Recebemos o seu pedido!\n\nNosso time irá avaliar a solicitação e em breve você reberá um novo e-mail com os dados para pagamento da sua licença Dominicall para o usuário ${user.name} (${user.username}).\n\nAssim que o seu pagamento for processado, emitiremos um e-mail de confirmação da compra que lhe servirá como recibo da operação.\n\nFique atento!\n\n\nAlguns lembretes importantes:\n- Nós não emitimos nota fiscal, apenas o recibo da transação;\n- Caso esteja com algum problema no acesso ou queira esclarecer alguma dúvida, entre em contato conosco através da playstore.\n\nAtenciosamente,\nEquipe Dominicall`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                errorHandler(error, res);
              } else {
                res.status(200).send({ message: "Operação realizada com sucesso!" });
              }
            }); 
          }
        });
      } catch(errr){
        errorHandler(errr, res);
      }
    }).catch(err => errorHandler(err, res));
  }).catch(err => errorHandler(err, res));
}

exports.licenseStatus = (req, res) => {
  User.findById(req.userId)
  .exec()
  .then(user=> {
    if(!user)
      return res.status(400).send({message: 'Informe dados adequados para realizar a operação!'});

    let status = 'unlicensed';

    if(user.license && user.license !== null){
      if(user.license === 'requested' || user.license === 'revoked'
                                      || user.license === 'expired'){
        status = user.license;
      } else {
        status = 'active';
      }

      res.status(200).send({status: status});
    } else {
      let sinceDt = new Date(user.since);
      let todayDt = new Date();

      const diffTime = Math.abs(todayDt - sinceDt);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if(diffDays > 14){
        status = 'expired';

        user.license = status;

        user.save().then(uUser => {
          res.status(200).send({status: status});
        }).catch(err => errorHandler(err, res));
      } else {
        res.status(200).send({status: status});
      }
    }
  }).catch(err => errorHandler(err, res));
}

exports.grantLicense = (req, res) => {
  User.findById(req.body.userId)
  .exec()
  .then(user=> {
    if(!user)
      return res.status(400).send({message: 'Informe dados adequados para realizar a operação!'});

    user.license = `D-${user._id}-${new Date().getTime()}`;

    user.save().then(user => {
      try {
        var transporter = nodemailer.createTransport({
          service:'gmail',
          auth: {
            user: config.smtp.email,
            pass: config.smtp.pass,
          },
        });

        transporter.verify().then(console.log).catch(console.error);

        var mailOptions = {
          from: config.smtp.from,
          to: user.email,
          subject: 'Recibo da operação',
          text: `A licença do usuário ${user.name} (${user.username}) foi ativada com sucesso! Seguem detalhes da transação:\n\n\nCódigo da licença: ${user.license}\nProcessado em: ${new Date()}\nStatus do pagamento: PAGO\nValor pago: R$ 10,00 (dez reais)\nPendências: N/A\nDetalhes:A operação foi processada sob a conceção de licença vitalícia ao aplicativo Dominicall para o usuário ${user.username}. A mesma é intransferível e é válida enquanto o usuário permanecer cadastrado no aplicativo, independentemente do tempo de uso ou inatividade.\n\n\nPara maiores detalhes, procure a nossa equipe através dos meios de comunicação já veículados.\n\nAtenciosamente,\nEquipe Dominicall`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            errorHandler(error, res);
          } else {
            res.status(200).send({ message: "Operação realizada com sucesso!" });
          }
        });
      } catch(errr){
        errorHandler(errr, res);
      }
    }).catch(err => errorHandler(err, res));
  }).catch(err => errorHandler(err, res));
}

exports.revokeLicense = (req, res) => {
  User.findById(req.params.id)
  .exec()
  .then(user=> {
    if(!user)
      return res.status(400).send({message: 'Informe dados adequados para realizar a operação!'});

    user.license = 'revoked';

    user.save().then(user => {
      res.status(200).send({message: 'Operação realizadao com sucesso!'});
    }).catch(err => errorHandler(err, res));
  }).catch(err => errorHandler(err, res));
}