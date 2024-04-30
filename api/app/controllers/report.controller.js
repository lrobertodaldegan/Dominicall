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
const Finance = db.finance;

const GENERAL_TEMPLATE_DIR = __dirname + "/../report/template/general.template.html";
const OFFER_TEMPLATE_DIR = __dirname + "/../report/template/finance.template.html";
const CALENDAR_TEMPLATE_DIR = __dirname + "/../report/template/calendar.template.html";
const STUDENTS_TEMPLATE_DIR = __dirname + "/../report/template/students.template.html";

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

  if(req.query.d && req.query.d !== null)
    dtRef = req.query.d;

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
      console.log(`${c._id} - ${c.name}`);

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

      let presencesQtd = new Number(presences ? presences.length : 0);

      let biblesQtd = new Number(0);
      let booksQtd  = new Number(0);

      for(let ii=0; ii < presencesQtd; ii++){
        if(presences[ii].bible === true)
          biblesQtd = biblesQtd + 1;
        
        if(presences[ii].book === true)
          booksQtd = booksQtd + 1;
      }

      let offers = await Offer.find({
        clas: c._id,
        dt:dtRef,    
      });

      let totalOffer = new Number(0);
      
      if(offers && offers.length > 0){
        for(let iii=0; iii < offers.length; iii++){
          totalOffer = new Number(offers[iii].value);
        }
      }

      let cdPercent = (presencesQtd * 100) / students

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
        percent:`${cdPercent.toFixed(2)}%`
      });

      totalPresences = totalPresences + presencesQtd;

      totalStudents = totalStudents + students;

      totalVisitors = totalVisitors + visitors;

      totalBibles = totalBibles + biblesQtd;

      totalBooks = totalBooks + booksQtd;

      totalAudience = totalAudience + (presencesQtd + visitors);

      totalAusences = totalAusences + (students - presencesQtd);

      totalOffers = totalOffers + totalOffer;
    }

    // let lastWeekDt = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);

    // let lastWeekDtLbl = utils.date.reportDateLabel(lastWeekDt);

    let reportName = utils.date.reportDateLabel();

    let destinationPath = __dirname + `/../report/output/${reportName}.pdf`;

    let html = fs.readFileSync(GENERAL_TEMPLATE_DIR, "utf8");

    let totalPercent = totalStudents === 0 ? 0 : ((totalPresences * 100) / totalStudents);

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
          offers: totalOffers && totalOffers !== null ? totalOffers.toFixed(2) : 0,
          percent:`${totalPercent.toFixed(2)}%`
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

exports.reportFinance = (req, res) => {
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
    let data = [];

    let groupName = groupId;

    let oTotal = 0;
    
    if(offers && offers.length > 0){
      groupName = offers[0].clas.group.name;

      for(let i=0; i < offers.length; i++){
        let o = offers[i];

        if(`${o.clas.group._id}` === `${groupId}`){
          data.push({
            className: o.clas.name,
            oValue: o.value,
            offerer: o.offerer,
            oDt: o.dt,
          });

          oTotal += o.value;
        }
      }
    }

    Finance.find()
    .exec()
    .then(fns => {
      let finances = [];

      if(fns){
        fns.map(f => {
          finances.push({
            title: f.title,
            type: f.type,
            value: f.value,
            dt: f.dt
          });
        });
      }

      let reportName = utils.date.reportDateLabel();

      let destinationPath = __dirname + `/../report/output/finance_${reportName}.pdf`;

      let html = fs.readFileSync(OFFER_TEMPLATE_DIR, "utf8");

      var report = {
        html: html,
        data: {
          groupName:groupName,
          dtRef: dtRef,
          itens: data,
          offerTotal: oTotal,
          finances: finances,
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
  }).catch(err => errorHandler(err, res));
}

exports.reportCalendars = async (req, res) => {
  let groupId = req.query.groupId;

  if(!groupId)
    return res.status(400).send('Informe um grupo para realizar a operação!');

  Clas.find({group: groupId})
  .populate('group')
  .exec()
  .then(async (classes) => {
    let groupName = groupId;

    if(!classes)
      return res.status(400).send('Não há dados para emitir o relatório.');

    groupName = classes[0].group.name;

    let dtRef = utils.date.dateLabel();

    let evs = [];
    let tcrs = [];

    for(let j=0; j < classes.length; j++) {
      let c = classes[j];

      let events = await Event.find({clas:c._id}).exec();

      let classTeachers = await ClassTeacher.find({clas:c._id})
                                            .populate({
                                              path:'teacher',
                                              populate:{
                                                path:'user'
                                              },
                                            }).exec();
      if(events && events.length > 0){
        events.map(ev => {
          evs.push({
            className: c.name,
            name: ev.name,
            dt: ev.dt,
            teacher: ev.teacher,
          });
        });
      }

      if(classTeachers && classTeachers.length > 0){
        classTeachers.map(t => {
          tcrs.push({
            className: c.name,
            order: t.order,
            name: t.teacher.user.name
          });
        });
      }
    }

    let reportName = utils.date.reportDateLabel();

    let destinationPath = __dirname + `/../report/output/calendar_${reportName}.pdf`;

    let html = fs.readFileSync(CALENDAR_TEMPLATE_DIR, "utf8");

    var report = {
      html: html,
      data: {
        groupName: groupName,
        dt: dtRef,
        events: evs,
        teachers: tcrs,
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

exports.reportStudents = (req, res) => {
  let groupId = req.query.groupId;

  if(!groupId)
    return res.status(400).send('Informe um grupo para realizar a operação!');

  Clas.find({group: groupId})
  .populate('group')
  .exec()
  .then(async (classes) => {
    let groupName = groupId;

    if(!classes)
      return res.status(400).send('Não há dados para emitir o relatório.');

    let students = [];

    groupName = classes[0].group.name;

    for(let j=0; j < classes.length; j++) {
      let c = classes[j];

      let stds = await Student.find({clas:c._id}).exec();

      if(stds){
        for(let i=0; i < stds.length; i++){
          let dtN = 'Não informado';
          
          if(stds[i].dn){
            let dt = new Date(stds[i]?.dn);

            let di = dt.getDate();
            di = di < 10 ? `0${di}` : di;
      
            let m = dt.getMonth() + 1;
            m = m < 10 ? `0${m}` : m;

            dtN = `${di}/${m}/${dt.getFullYear()}`;
          }

          students.push({
            name: stds[i].name,
            number: stds[i].number,
            since: stds[i].since,
            className: c.name,
            dn: dtN,
            memberStatus: stds[i].churchMember === true ? 'SIM' : 'AINDA NÃO'
          });
        }
      }
    }

    let reportName = utils.date.reportDateLabel();

    let destinationPath = __dirname + `/../report/output/students_${reportName}.pdf`;
  
    let html = fs.readFileSync(STUDENTS_TEMPLATE_DIR, "utf8");
  
    var report = {
      html: html,
      data: {
        groupName:groupName,
        dt: utils.date.dateLabel(),
        students: students
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