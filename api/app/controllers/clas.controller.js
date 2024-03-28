const util = require('../utils');
const db = require("../models");
const Clas = db.clas;
const Offer = db.offer;
const Event = db.event;
const Student = db.student;
const Visitor = db.visitor;
const Presence = db.presence;
const ClassTeacher = db.classteacher;

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message:  `Ops!` });
    return;
  }
}

exports.getClasses = (req, res) => {
  Clas.find({
    group:req.groupId
  })
  .exec()
  .then(async (classes) => {
    let result = [];
    let status = 204;

    if(classes && classes !== null){
      status = 200;

      for(let i=0; i < classes.length; i++){
        let classs = classes[i];

        const students = await Student.where({clas: classs._id})
                                      .countDocuments();

        const teachers = await ClassTeacher.where({clas: classs._id})
                                           .countDocuments();

        result.push({
          _id: classs._id,
          name: classs.name,
          groupId: classs.group,
          teachers: teachers,
          students: students
        });
      }
    }

    res.status(status).send({classes:result});

  }).catch(err => errorHandler(err, res));
}

exports.create = (req, res) => {
  if(req.body.name) {
    const newClass = new Clas({
      name:req.body.name,
      group:req.groupId
    });

    newClass.save().then(clas => {
      res.status(201).send({message:`Turma ${clas.name} criada com sucesso!`});
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message: "Informe um nome para identificar a turma!"});
  }
}

exports.update = (req, res) => {
  if(req.body.id && req.body.name) {
    Clas.findById(req.body.id).then(clas => {
      if(clas){
        clas.save().then(clas => {
          res.status(200).send({message:`Turma ${clas.name} atualizada com sucesso!`});
        }).catch(err => errorHandler(err, res));
      } else {
        res.status(404).send({message:'Não encontramos essa turma!'});
      }
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message: "Informe os dados necessários para a operação!"});
  }
}

const handleClassDeletion = (classId, callback=()=>null) => {
  try{
    Promise.allSettled([
      Event.deleteMany({clas:classId}).exec(),
      Offer.deleteMany({clas:classId}).exec(),
      Student.deleteMany({clas:classId}).exec(),
      Visitor.deleteMany({clas:classId}).exec(),
      Presence.deleteMany({clas:classId}).exec(),
      ClassTeacher.deleteMany({clas:classId}).exec(),
    ]).then(() => {
      Clas.deleteOne({
        _id:classId
      })
      .exec()
      .catch(err => console.log(err));
    }).then(callback);
  }catch(err){
    console.log(err);
  }
}

exports.handleGroupDeletion = (groupId, callback=()=>null) => {
  try{
    Clas.find({
      group:groupId
    })
    .exec()
    .then(classes => {
      if(classes)
        classes.map(c => handleClassDeletion(c._id));
    })
    .then(callback);
  }catch(err){
    console.log(err);
  }
}

exports.remove = (req, res) => {
  return handleClassDeletion(req.params.id, () => {
    res.status(200).send({message: 'Operação realizada com sucesso!'});
  });
}

exports.getOffers = (req, res) => {
  Offer.find({
    clas:req.query.classId,
    dt:req.query.dt,
  })
  .then(offers => {
    let status = offers && offers.length > 0 ? 200 : 204;

    res.status(status).send({offers: offers});
  }).catch(err => errorHandler(err, res));
}

exports.createOffer = (req, res) => {
  const offer = new Offer({
    value:req.body.value,
    dt:req.body.dt,
    offerer:req.body.offerer,
    clas:req.body.classId
  });

  offer.save().then(o => {
    res.status(201).send({message:'Oferta registrada com sucesso!'});
  }).catch(err => errorHandler(err, res));
}

exports.removeOffer = (req, res) => {
  Offer.deleteOne({_id:req.params.id})
  .then(() => {
    res.status(200).send({message:'Operação realizada com sucesso!'});
  }).catch(err => errorHandler(err, res));
}

exports.getVisitors = (req, res) => {
  Visitor.find({
    clas:req.query.classId,
    dt:req.query.dt,
  })
  .then(visitors => {
    let status = visitors && visitors.length > 0 ? 200 : 204;

    res.status(status).send({visitors: visitors});
  }).catch(err => errorHandler(err, res));
}

exports.createVisitor = (req, res) => {
  const visitor = new Visitor({
    clas:req.body.classId,
    dt:req.body.dt,
    name:req.body.name
  });

  visitor.save().then(o => {
    res.status(201).send({message:'Visita registrada com sucesso!'});
  }).catch(err => errorHandler(err, res));
}

exports.removeVisitor = (req, res) => {
  Visitor.deleteOne({_id:req.params.id})
  .then(() => {
    res.status(200).send({message:'Operação realizada com sucesso!'});
  }).catch(err => errorHandler(err, res));
}

exports.getClassTeachers = (req, res) => {
  ClassTeacher.find({
    clas:req.query.classId
  })
  .populate({
    path:"teacher",
    populate:{
      path:'role'
    }
  })
  .populate({
    path:"teacher",
    populate:{
      path:'user'
    }
  })
  .then(async (teachers) => {
    let result = [];
    let status = teachers && teachers.length > 0 ? 200 : 204;

    if(status === 200){
      for(let i=0; i < teachers.length; i++){
        let classTeacher = teachers[i];

        if(req.query.reorder && req.query.reorder === 1){
          classTeacher.order = i;

          await classTeacher.save();
        }  

        result.push({
          _id:classTeacher._id,
          memberId:classTeacher.teacher._id,
          name:classTeacher.teacher.user.name,
          username: classTeacher.teacher.user.username,
          role:classTeacher.teacher.role.name,
          order:classTeacher.order,
        });
      }
    }

    res.status(status).send({teachers: result});
  }).catch(err => errorHandler(err, res));
}

exports.changeTeacherOrder = (req, res) => {
  if(req.body.teacherId && req.body.order){
    ClassTeacher.findById(req.body.teacherId)
    .then(ct => {
      ct.order = req.body.order;

      ct.save().then(uct => {
        res.status(200).send({message:'Operação realizada com sucesso!'});
      }).catch(err => errorHandler(err, res));
    }).catch(err => errorHandler(err, res));
  } else {
    res.status(400).send({message:'Informe os dados necessários para a operação!'});
  }
}

exports.getEvents = (req, res) => {
  Event.find({
    clas:req.query.classId,
    dt:req.query.dt,
  })
  .then(events => {
    let status = events && events.length > 0 ? 200 : 204;

    res.status(status).send({events: events});
  }).catch(err => errorHandler(err, res));
}

exports.createEvent = (req, res) => {
  const event = new Event({
    clas:req.query.classId,
    dt:req.query.dt,
    name:req.query.name,
    teacher:req.body.teacher
  });

  event.save().then(o => {
    res.status(201).send({message:'Evento registrado com sucesso!'});
  }).catch(err => errorHandler(err, res));
}

exports.removeEvent = (req, res) => {
  Event.deleteOne({_id:req.params.id})
  .then(() => {
    res.status(200).send({message:'Operação realizada com sucesso!'});
  }).catch(err => errorHandler(err, res));
}

exports.getPresences = (req, res) => {
  if(req.query.studentId){
    Presence.findOne({
      clas:req.query.classId,
      dt:req.query.dt,
      student: req.query.studentId
    })
    .populate('student')
    .then(presence => {
      if(presence){
        res.status(200).send(presence);
      } else {
        res.status(404).send({message:'Não encontramos o item.'});
      }
    }).catch(err => errorHandler(err, res));
  } else {
    Presence.find({
      clas:req.query.classId,
      dt:req.query.dt,
    })
    .populate('student')
    .then(presences => {
      let status = presences && presences.length > 0 ? 200 : 204;

      res.status(status).send({presences: presences});
    }).catch(err => errorHandler(err, res));
  }
}

exports.createPresence = (req, res) => {
  new Presence({
    dt: req.body.dt ? req.body.dt : util.date.dateLabel(),
    clas: req.body.classId,
    student: req.body.studentId,
    bible: req.body.bible === true,
    book: req.body.book === true
  })
  .save()
  .then(presence => {
    res.status(201).send(presence);
  }).catch(err => errorHandler(err, res));
}

exports.updatePresence = (req, res) => {
  Presence.findById(req.params.id)
  .then(presence => {
    if(presence){
      presence.bible = req.body.bible === true;
      presence.book  = req.body.book  === true;

      presence.save().then(p => {
        res.status(200).send(p);
      });

    } else {
      res.status(404).send({message: 'Item não encontrado!'});
    }
  }).catch(err => errorHandler(err, res));
}

exports.removePresence = (req, res) => {
  Presence.deleteOne({_id:req.params.id})
  .then(() => {
    res.status(200).send({message:'Operação realizada com sucesso!'});
  }).catch(err => errorHandler(err, res));
}

exports.getStudents = (req, res) => {
  Student.find({
    clas:req.query.classId,
  })
  .then(async (students) => {
    let status = students && students.length > 0 ? 200 : 204;

    if(req.query.dt){
      let result = [];

      for(let i=0; i < students.length; i++){
      
        let student = students[i];

        let filter = {
          clas:req.query.classId,
          dt:req.query.dt,
          student:student._id,
        }

        let qtd = await Presence.where(filter).countDocuments();

        let presence = null;

        if(qtd > 0)
          presence = await Presence.findOne(filter);

        result.push({
          ...student._doc,
          presence:presence,
          presences:qtd
        });
      }

      res.status(status).send({students: result});
    } else {
      res.status(status).send({students: students});
    }
  }).catch(err => errorHandler(err, res));
}

exports.createStudent = (req, res) => {
  const student = new Student({
    clas:req.body.classId,
    name:req.body.name,
    since:util.date.dateLabel()
  });

  student.save().then(o => {
    res.status(201).send({message:`Aluno ${o.name} matriculado com sucesso!`});
  }).catch(err => errorHandler(err, res));
}

exports.removeStudent = (req, res) => {
  try{
    Student.findById(req.params.id)
    .then((student) => {
      if(student){
        Presence.deleteMany({
          student: student._id
        })
        .exec()
        .then(() => {
          Student.deleteOne({_id:student._id}).exec();
        });
      }

      res.status(200).send({message:'Operação realizada com sucesso!'});
    });
  }catch(err){
    return errorHandler(err, res)
  }
}