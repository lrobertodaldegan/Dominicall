const db = require("../models");
const Group = db.group;
const GroupMember = db.groupmember;

verifyUserGroup = (req, res, next) => {
  let group = req.get('Group');

  if (!group || !req.userId)
    return res.status(403).send({ message: "Acesso negado!" });

  GroupMember.findOne({
    user: req.userId, 
    group:group
  })
  .exec()
  .then(gm => {
    if(!gm)
      return res.status(403).send({ message: "Acesso negado ao grupo!" });

    req.groupId = group;

    next();
  }).catch(err => errorHandler(err, res));
};

verifyGroupMemberDuplicity = (req, res, next) => {
  GroupMember.findOne({
    user: req.body.username, 
    group:req.groupId
  })
  .exec()
  .then(gm => {
    if(gm)
      return res.status(400).send({ message: "Usuário já possui acesso ao grupo!" });

    next();
  }).catch(err => errorHandler(err, res));
};

verifyGroupDuplicity = (req, res, next) => {
  Group.findOne({
    owner:req.userId,
    _id:req.groupId
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