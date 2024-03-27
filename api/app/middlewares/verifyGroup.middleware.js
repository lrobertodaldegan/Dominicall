const db = require("../models");
const Group = db.group;
const GroupMember = db.groupmember;
const User = db.user;

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  `Ops!` });
    return;
  }
}

verifyUserGroup = (req, res, next) => {
  let group = req.get('Group');

  if(!group)
    group = req.get('group');

  if (!group || !req.userId)
    return res.status(403).send({ message: "G1 - Acesso negado!" });

  GroupMember.findOne({
    user: req.userId, 
    group:group
  })
  .exec()
  .then(gm => {
    if(!gm)
      return res.status(403).send({ message: "G2 - Acesso negado ao grupo!" });

    req.groupId = group;

    next();
  }).catch(err => errorHandler(err, res));
};

verifyGroupMemberDuplicity = (req, res, next) => {
  User.findOne({
    username: req.body.username
  })
  .exec()
  .then(user => {
    if(!user)
      return next();
      
    GroupMember.findOne({
      user: user._id, 
      group:req.groupId
    })
    .exec()
    .then(gm => {
      if(gm)
        return res.status(400).send({ message: "Usuário já possui acesso ao grupo!" });
  
      next();
    }).catch(err => errorHandler(err, res));
  }).catch(err => errorHandler(err, res));
};

verifyGroupDuplicity = (req, res, next) => {
  Group.findOne({
    owner:req.userId,
    name:req.body.name
  })
  .exec()
  .then(group => {
    if(group)
      return res.status(400).send({ message: "Você já possui um grupo com esse nome!" });

    next();
  }).catch(err => errorHandler(err, res));
};

module.exports = {
  verifyUserGroup,
  verifyGroupDuplicity,
  verifyGroupMemberDuplicity,
}