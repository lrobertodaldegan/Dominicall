const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

exports.signUp = (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save().then(user => {
    res.status(201).send({ 
      message: `Usuário ${user.name} criado com sucesso!` 
    });
  }).catch(err => errorHandler(err, res));
}

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
  .exec()
  .then(user => {
    if (!user)
      return res.status(404).send({ message: "Usuário não encontrado!" });

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid)
      return res.status(401).send({ message: "Ops! Senha errada!" });

    const token = jwt.sign({ id: user._id },
                            config.secret,
                            {
                              algorithm: 'HS256',
                              allowInsecureKeySizes: true,
                              expiresIn: '300d',
                            });

    res.setHeader('Authorization', token);

    res.status(200).send({
      id: user._id,
      username: user.username,
      name: user.name,
      token: token
    });
  }).catch(err => errorHandler(err, res));
};

exports.refresh = async (req, res) => {
  User.findById(req.userId)
  .exec()
  .then(user => {
    if (!user)
      return res.status(404).send({ message: "Usuário não encontrado!" });

    const token = jwt.sign({ id: user._id },
                            config.secret,
                            {
                              algorithm: 'HS256',
                              allowInsecureKeySizes: true,
                              expiresIn: '300d',
                            });

    res.setHeader('Authorization', token);

    res.status(200).send({
      id: user._id,
      username: user.username,
      name: user.name,
      token: token
    });
  }).catch(err => errorHandler(err, res));
};

exports.signout = async (req, res) => {
  try {
    req.session = null;

    res.status(200).send({ message: "Você foi desconectado!" });
  } catch (err) {
    this.next(err);
  }
};