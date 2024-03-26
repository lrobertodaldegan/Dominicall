const pdf = require("pdf-creator-node");
const fs = require("fs");
const utils = require('../utils');
const db = require('../models');
const Presence = require("../models/presence.model");
const Clas = db.clas;
const Student = db.student;
const Visitor = db.visitor;
const Offer = db.offer;
const Event = db.event;
const ClassTeacher = db.classteacher;

const GENERAL_TEMPLATE_DIR = __dirname + "/../report/template/general.template.html";
const OFFER_TEMPLATE_DIR = __dirname + "/../report/template/offer.template.html";
const CALENDAR_TEMPLATE_DIR = __dirname + "/../report/template/calendar.template.html";

const errorHandler = (err, res) => {
  if (err) {
    console.log(err);
    res.status(500).send('Ocorreu um erro interno ao tentar realizar a operação!');
    return;
  }
}

exports.report = (req, res) => {
  let groupId = req.query.groupId;

  if(!groupId)
    return res.status(400).send('Informe um grupo para realizar a operação!');

  let dtRef = utils.date.dateLabel();

  Clas.find({
    group:groupId
  })
  .populate('group')
  .exec()
  .then(async (classes) => {
    if(!classes)
      return res.status(204).send('Não há dados para relatório!');

    let classData = [];

    let totalStudents = 0;
    let totalPresences = 0;
    let totalVisitors = 0;
    let totalAusences = 0;
    let totalAudience = 0;
    let totalBibles = 0;
    let totalBooks = 0;
    let totalOffers = 0;

    for(let i=0; i < classes.length; i++){
      let c = classes[i];

      let students = await Student.where({clas: c._id})
                                  .countDocuments();

      let visitors = await Visitor.where({
                                      clas: c._id,
                                      dt:dtRef,    
                                    }).countDocuments();

      let presences = await Presence.find({
                                          clas: c._id,
                                          dt:dtRef,    
                                        });

      let presencesQtd = presences ? presences.length : 0;

      let biblesQtd = 0;
      let booksQtd  = 0;

      for(let ii=0; ii < presencesQtd; ii++){
        if(presences[ii].bible === true)
          biblesQtd += 1;
        
        if(presences[ii].book === true)
          booksQtd += 1;
      }

      let offers = await Offer.find({
        clas: c._id,
        dt:dtRef,    
      });

      let totalOffer = 0;
      
      if(offers && offers.length > 0){
        for(let iii=0; iii < offers.length; iii++){
          totalOffer += offers[iii];
        }
      }

      classData.push({
        name:c.name,
        students:students,
        presences:presencesQtd,
        ausences:students - presencesQtd,
        visitors:visitors,
        audience:presencesQtd + visitors,
        bibles:biblesQtd,
        books:booksQtd,
        offers:totalOffer,
        percent:`${(presences * 100) / students}%`
      });
    }

    // let lastWeekDt = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);

    // let lastWeekDtLbl = utils.date.reportDateLabel(lastWeekDt);

    let reportName = utils.date.reportDateLabel();

    let destinationPath = __dirname + `/../report/output/${reportName}.pdf`;

    let html = fs.readFileSync(GENERAL_TEMPLATE_DIR, "utf8");

    var report = {
      html: html,
      data: {
        classes: classData,
        total: {
          students: totalStudents,
          presences: totalPresences,
          visitors: totalVisitors,
          ausences: totalAusences,
          audience: totalAudience,
          bibles: totalBibles,
          books: totalBooks,
          offers: totalOffers,
          percent:`${(totalPresences * 100) / totalStudents}%`
        },
        dt:dtRef,
        group:{name:classes[0].group.name}
      },
      path: destinationPath,
      type: "",
    }

    pdf.create(report, {
      format: "A4",
      orientation: "landscape",
      border: "10mm",
    })
    .then((result) => {
      //res.status(200).send({message: 'Report criado e disponível para download!'});
      res.download(destinationPath);
    }).catch(err => errorHandler(err, res));
  }).catch(err => errorHandler(err, res));
}

exports.reportOffers = (req, res) => {
  let groupId = req.query.groupId;

  if(!groupId)
    return res.status(400).send('Informe um grupo para realizar a operação!');

  let dtRef = utils.date.dateLabel();

  Offer.find({
    dt: dtRef
  })
  .populate({
    path:'clas',
    populate:{
      path:'group'
    }
  })
  .exec()
  .then((offers) => {
    if(!offers)
      return res.status(204).send('Não há dados para relatório!');

    let data = [];

    let groupName = offers[0].class.group.name;

    for(let i=0; i < offers.length; i++){
      let o = offers[i];

      if(o.clas.group._id === groupId){
        let item = {
          className: o.clas.name,
          offers:[],
          total:0,
        };

        let filtered = data.filter(d => d.className === o.clas.name);

        if(filtered && filtered.length > 0)
          item = filtered[0];

        item.total += o.value;

        item.offers.push({
          value: o.value,
          offerer: o.offerrer,
        });

        item.offers = item.offers.sort(a, b => a.value > b.value ? 1 : -1);

        if(!(filtered && filtered.length > 0))
          data.push(item);
      }
    }

    let reportName = utils.date.reportDateLabel();

    let destinationPath = __dirname + `/../report/output/offers_${reportName}.pdf`;

    let html = fs.readFileSync(OFFER_TEMPLATE_DIR, "utf8");

    var report = {
      html: html,
      data: {
        groupName:groupName,
        dt: dtRef,
        itens: data 
      },
      path: destinationPath,
      type: "",
    }

    pdf.create(report, {
      format: "A4",
      orientation: "landscape",
      border: "10mm",
    })
    .then((result) => {
      //res.status(200).send({message: 'Report criado e disponível para download!'});
      res.download(destinationPath);
    }).catch(err => errorHandler(err, res));
  }).catch(err => errorHandler(err, res));
}

exports.reportCalendars = async (req, res) => {
  let classId = req.query.classId;

  if(!classId)
    return res.status(400).send('Informe uma turma para realizar a operação!');

  let events = await Event.find({clas:classId})
                          .populate({
                            path:'clas',
                            populate:{
                              path:'group'
                            }
                          })
                          .exec();

  let classTeachers = await ClassTeacher.find({clas:classId})
                                        .populate({
                                          path:'teacher',
                                          populate:{
                                            path:'user'
                                          },
                                        })
                                        .populate({
                                          path:'clas',
                                          populate:{
                                            path:'group'
                                          }
                                        }).exec();

  if(!events && !classTeachers)
    return res.status(204).send('Não há dados para emitir o relatório!');
  
  let dtRef = utils.date.dateLabel();

  let className = null;
  let groupName = null;

  if(events && events.length > 0) {
    className = events[0].clas.name;
    groupName = events[0].clas.group.name;
  }

  if(classTeachers && classTeachers.length > 0) {
    if(className === null)
      className = classTeachers[0].clas.name;
    
    if(groupName === null)
      groupName = classTeachers[0].clas.group.name;
  }

  let reportName = utils.date.reportDateLabel();

  let destinationPath = __dirname + `/../report/output/calendar_${reportName}.pdf`;

  let html = fs.readFileSync(CALENDAR_TEMPLATE_DIR, "utf8");

  var report = {
    html: html,
    data: {
      groupName:groupName,
      className:className,
      dt: dtRef,
      events: events,
      teachers: classTeachers, 
    },
    path: destinationPath,
    type: "",
  }

  pdf.create(report, {
    format: "A4",
    orientation: "landscape",
    border: "10mm",
  })
  .then((result) => {
    //res.status(200).send({message: 'Report criado e disponível para download!'});
    res.download(destinationPath);
  }).catch(err => errorHandler(err, res));
}