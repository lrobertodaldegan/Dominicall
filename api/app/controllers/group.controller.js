const db = require("../models");
const Role = db.role;
const User = db.user;
const Group = db.group;
const Clas = db.clas;
const ClassTeacher = db.classteacher;
const GroupMember = db.groupmember;

const classController = require('./clas.controller');

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  `Ops!` });
    return;
  }
}

exports.create = (req, res) => {
  if(req.body.name) {
    const newGroup = new Group({
      name:req.body.name,
      owner:req.userId
    });

    newGroup.save().then(group => {
      Role.findOne({name:'Coordenador'})
      .exec().then(coord => {
        const newGm = new GroupMember({
          user:req.userId,
          group:group._id,
          role:coord._id,
        });

        newGm.save().then(gm => {
          res.status(201).send({message:`Grupo ${group.name} criado com sucesso!`});
        });
      }).catch(err => errorHandler(err, res));
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message: "Informe um nome para identificar o grupo!"});
  }
}

exports.update = (req, res) => {
  if(req.body.id && req.body.name) {
    Group.findById(req.body.id).then(group => {
      if(group){
        group.save().then(group => {
          res.status(200).send({message:`Grupo ${group.name} atualizado com sucesso!`});

        }).catch(err => errorHandler(err, res));
      } else {
        res.status(404).send({message:'Não encontramos esse grupo!'});
      }
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message: "Informe os dados necessários para a operação!"});
  }
}

exports.remove = (req, res) => {
  if(req.params.id){
    classController.handleGroupDeletion(req.params.id);

    GroupMember.deleteMany({
      group:req.params.id
    }).then(() => {
      Group.deleteOne({_id:req.params.id})
      .then(() => {
        res.status(200).send({message: 'Operação realizada com sucesso!'});
      
      }).catch(err => errorHandler(err, res));
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message: "Informe os dados necessários para a operação!"});
  }
}

exports.createMember = (req, res) => {
  let reqOk = (req.body.username && req.body.name && req.body.role) === true;

  Role.findOne({
    name: req.body.role
  })
  .then(role => {
    let isTeacher = role?.name === 'Professor';

    reqOk = !(!role || (isTeacher === true && !req.body.classId));

    if(!reqOk)
      return res.status(400).send({message: "Informe os dados necessários para a operação!"});

    User.findOne({
      username:req.body.username
    })
    .exec()
    .then(async (user) => {
      let memberUser = user;

      if(!(memberUser && memberUser !== null)){
        const newUser = new User({
          username:req.body.username,
          name:req.body.name,
          email:req.body.email,
        });

        memberUser = await newUser.save();
      }

      let nGm = await GroupMember.findOne({
                                    user:memberUser._id,
                                    group: req.groupId
                                  });
      if(!nGm){
        const newGroupMember = new GroupMember({
          user:memberUser,
          role:role._id,
          group:req.groupId
        });
        
        nGm = await newGroupMember.save();
      }

      if(isTeacher === true){
        ClassTeacher.where({
          clas:req.body.classId
        })
        .countDocuments()
        .then(qtd => {
          const ct = new ClassTeacher({
            clas:req.body.classId,
            teacher:nGm._id,
            order:qtd + 1,
          });

          ct.save().then(teacher => {
            res.status(201).send({message: `Professor ${memberUser.name} adicionado ao grupo!`});

          }).catch(err => errorHandler(err, res));
        }).catch(err => errorHandler(err, res));

      } else {
        res.status(201).send({message: `Usuário ${memberUser.name} adicionado ao grupo!`});
      }
    }).catch(err => errorHandler(err, res));
  }).catch(err => errorHandler(err, res));
}

const deleteMember = (id, res) => {
  GroupMember.deleteOne({_id:id})
  .then(() => {
    return res.status(200).send({message: 'Operação realizada com sucesso!'});
  }).catch(err => errorHandler(err, res));
}

exports.removeMember = (req, res) => {
  if(req.params.id){
    GroupMember.findById(req.params.id)
    .populate('role')
    .populate('user')
    .populate({
      path:'group',
      populate:{
        path:'owner'
      }
    })
    .then(gm => {
      if(gm){
        ClassTeacher.findOne({
          teacher:req.params.id,
          clas: req.query.classId
        })
        .then((ct) => {
          if(ct)
            ClassTeacher.deleteOne({_id:ct._id}).exec();
          
          if(`${gm.group.owner._id}` === `${gm.user._id}`)
            res.status(200).send({message: 'Operação realizada com sucesso!'});
          else
            return deleteMember(req.params.id, res);

        }).catch(err => errorHandler(err, res));
      }
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message: "Informe os dados necessários para a operação!"});
  }
}

exports.userGroups = (req, res)  => {
  GroupMember.find({
    user:req.userId
  })
  .populate('group')
  .populate('role')
  .exec()
  .then(async (memberGroups) => {
    if(memberGroups && memberGroups !== null && memberGroups.length > 0){
      let result = [];

      for(let i=0; i < memberGroups.length; i++){
        let mg = memberGroups[i];

        const csQtd = await Clas.where({group:mg.group._id}).countDocuments();

        result.push({
          _id:mg.group._id,
          name:mg.group.name,
          roleId:mg.role._id,
          role:mg.role.name,
          memberId:mg._id,
          classes:csQtd,
        });
      }

      res.status(200).send({groups:result});
    } else {
      res.status(204).send({groups:[]});
    }
  }).catch(err => errorHandler(err, res));
}

exports.groupMembers = (req, res) => {
  GroupMember.find({
    group:req.groupId
  })
  .populate('user')
  .populate('role')
  .exec()
  .then(memberGroups => {
    let result = [];
    let status = memberGroups && memberGroups.length > 0 ? 200 : 204;

    if(status === 200){
      for(let i=0; i< memberGroups.length; i++){
        let m = memberGroups[i];

        result.push({
          _id: m._id,
          name:m.user.name,
          username:m.user.username,
          role:m.role.name
        });
      }
    }

    res.status(status).send({members:result});
  }).catch(err => errorHandler(err, res));
}