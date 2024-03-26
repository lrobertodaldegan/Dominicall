const db = require("../models");
const User = db.user;
const GroupMember = db.groupmember;
const Group = db.group;

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  'Ops!' });
    return;
  }
}

exists = (req, res, next) => {
  if(req.body.username){
    User.findOne({
      username:req.body.username
    })
    .then(user => {
      if(!user) {
        return res.status(404).send({message:"Não encontramos o usuário!"});
      } else {
        if(!req.user)
          req.user = user;

        next();
      }
    }).catch(err => errorHandler(err, res));
  } else {
    return res.status(400)
              .send({message: "informe o usuário para realizar a operação!"});
  }
}

hasEmail = (req, res, next) => {
  let errormsg = {message: "Usuário sem e-mail cadastrado!"};

  if(req.userId && req.userId !== null){
    User.findById(req.userId)
    .then((user) => {
      if(user?.email && user?.email !== null){
        if(!req.user)
          req.user = user;

        next();
      }else{
        return res.status(400).send(errormsg);
      }
    });
  } else {
    if(req.body?.username && req.body?.username !== null){
      User.findOne({
        username:req.body.username
      }).then((user) => {
        if(user?.email && user?.email !== null){
          if(!req.user)
            req.user = user;

          next();
        } else {
          return res.status(400).send(errormsg);
        }
      });
    } else {
      return res.status(400).send({message: "Usuário não informado!"});
    }
  }
}

checkDuplicateUsername = (req, res, next) => {
  if(req.body.username){
    User.findOne({
      username: req.body.username
    }).then((user) => {
      if (user) {
        if(req.userId && req.userId != null){
          User.findById(req.userId).exec().then(userById => {
            if(`${user._id}` === `${userById._id}`){

              if(!req.user)
                req.user = gm.user

              next();
            } else {
              res.status(400).send({ message: "Usuário já existe!" });
              return;
            }
          }).catch(err => errorHandler(err, res));
        } else {
          res.status(400).send({ message: "Usuário já existe!" });
          return;
        }
      } else {
        next();
      }
    }).catch(err => errorHandler(err, res));
  } else {
    return res.status(400).send({message: "informe o usuário para realizar a operação!"});
  }
};

justGroupOwner = (req, res, next) => {
  if(!req.userId || req.userId === null
                 || !req.params.id){
    res.status(401).send({ message: "JO1 - Sem autorização!" });

    return;
  } else {
    Group.find({
      owner: req.userId,
      _id:req.params.id
    })
    .exec().
    then(group => {
      if(group)
        next();
      else
        return res.status(401).send({ message: "JO2 - Sem autorização!" });
    }).catch(err => errorHandler(err, res));
  }
};

justCoord = (req, res, next) => {
  if(!req.userId || req.userId === null
    || !req.groupId || req.groupId === null){

    res.status(401).send({ message: "JC1 - Sem autorização!" });

    return;
  } else {
    GroupMember.findOne({
      user: req.userId, 
      group:req.groupId
    })
    .populate("role")
    .populate("user")
    .exec()
    .then(gm => {
      if(gm.role.name === 'Coordenador'){
        if(!req.user)
          req.user = gm.user

        next();
      } else {
        res.status(401).send({ message: "JC2 - Sem autorização!" });

        return;
      }
    }).catch(err => errorHandler(err, res));
  }
}

justTeacher = (req, res, next) => {
  if(!req.userId || req.userId === null 
    || !req.groupId || req.groupId === null){

    res.status(401).send({ message: "JT1 - Sem autorização!" });

    return;
  } else {
    GroupMember.findOne({
      user: req.userId, 
      group:req.groupId
    })
    .populate("role")
    .populate("user")
    .exec()
    .then(gm => {
      if(gm.role.name === 'Coordenador' || gm.role.name === 'Professor'){
        if(!req.user)
          req.user = gm.user

        next();
      } else {
        res.status(401).send({ message: "JT2 - Sem autorização!" });

        return;
      }
    }).catch(err => errorHandler(err, res));
  }
}

module.exports = {
  checkDuplicateUsername,
  justCoord,
  justTeacher,
  justGroupOwner,
  exists,
  hasEmail,
};