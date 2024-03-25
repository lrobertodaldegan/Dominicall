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
          name: classs.name,
          groupId: classs.group,
          techers: teachers,
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

exports.remove = (req, res) => {
  Clas.deleteOne({_id:req.params.id})
  .then(() => {
    res.status(200).send({message: 'Operação realizada com sucesso!'});
  }).catch(err => errorHandler(err, res));
}

exports.getOffers = (req, res) => {
  Offer.find({
    clas:req.query.classId,
    dt:req.query.dt,
  })
  .then(offers => {
    let status = offers && offers.length > 0 ? 200 : 204;

    res.status(status).send(offers);
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

    res.status(status).send(visitors);
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
    clas:classId
  })
  .populate({
    path:"teacher",
    populate:{
      path:'role'
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
          name:classTeacher.name,
          role:classTeacher.teacher.role.name,
          order:classTeacher.order,
        });
      }
    }

    res.status(status).send(result);
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

    res.status(status).send(events);
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
  Presence.find({
    clas:req.query.classId,
    dt:req.query.dt,
  })
  .populate('student')
  .then(presences => {
    let status = presences && presences.length > 0 ? 200 : 204;

    res.status(status).send(presences);
  }).catch(err => errorHandler(err, res));
}

exports.createPresence = (req, res) => {}

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
  .then(students => {
    let status = students && students.length > 0 ? 200 : 204;

    if(req.query.dt){
      let result = [];

      for(let i=0; i < students.length; i++){
      
        let student = students[i];

        Presence.findOne({
          clas:req.query.classId,
          dt:req.query.dt,
          student:student._id,
        })
        .then(presence => {
          result.push({
            ...student,
            presence:presence
          });
        });
      }

      res.status(status).send(result);
    } else {
      res.status(status).send(students);
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
  Student.deleteOne({_id:req.params.id})
  .then(() => {
    res.status(200).send({message:'Operação realizada com sucesso!'});
  }).catch(err => errorHandler(err, res));
}