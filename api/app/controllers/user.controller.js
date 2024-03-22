var bcrypt = require("bcryptjs");
var nodemailer = require('nodemailer');
var jwt = require("jsonwebtoken");

const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Code = db.code;

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

exports.sendResetPassword = (req, res) => {
  if(req.body.username){
    User.findOne({
      username:req.body.username
    })
    .then(user => {
      if(!user){
        res.status(404).send({message:"Não encontramos o usuário!"});
      } else {
        if(!user.email || user.email === null){
          res.status(404).send({message:"Não é possível resetar a senha automaticamente. O usuário não possui e-mail cadastrado!"});
        } else {
          var transporter = nodemailer.createTransport({
            host: config.smtp.host,
            port: config.smtp.port,
            auth: {
              user: config.smtp.email,
              pass: config.smtp.pass,
            },
          });

          transporter.verify().then(console.log).catch(console.error);

          const rc = new Code({
            code: Math.round(Math.random() * 100000),
            used: false,
            user: user,
            usefor: 'resetpass'
          });

          rc.save().then(resetCode => {
            var mailOptions = {
              from: config.smtp.email,
              to: user.email,
              subject: 'Código de segurança',
              text: `Informe este código diretamente no aplicativo para realizar a troca de senha: ${resetCode.code}!`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email enviado: ' + info.response);
              }

              res.status(200).send({ message: "E-mail enviado!" });
            });
          }).catch(err => errorHandler(err, res));
        }
      }
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message: "informe o usuário para realizar a operação!"});
  }
}

exports.codeValidation = (req, res) => {
  if(req.body.code && req.body.code > 0){
    Code.findOne({
      code:req.body.code
    })
    .populate('user')
    .then(resetCode => {
      if(!resetCode){
        res.status(400).send({message:'Código inválido!'});
      } else {
        if(resetCode.used === true){
          res.status(400).send({message:'Este código já foi utilizado!'});
        } else {
          let userId = resetCode.user._id;

          Code.deleteOne({
            _id:resetCode._id
          })
          .catch(err => console.log('Erro ao invalidar código!'));

          const token = jwt.sign({ id: userId },
                                    config.secret,
                                    {
                                      algorithm: 'HS256',
                                      allowInsecureKeySizes: true,
                                      expiresIn: 5184000,//60 days
                                    });
          res.status(200).send({
            id: userId,
            token: token
          });
        }
      }
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message:"Informe um códio para realizar a operação!"});
  }
}

exports.resetPass = (req, res) => {
  if(req.body.password){
    let user = req.user;
    
    user.password = bcrypt.hashSync(req.body.password, 8);

    user.save().then(user => {
      res.status(200).send({ 
        message: `Usuário ${user.name} atualizado com sucesso!` 
      });
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message:"Informe uma senha nova para realizar a operação!"});
  }
}