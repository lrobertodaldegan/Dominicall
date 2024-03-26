const pdf = require("pdf-creator-node");
const fs = require("fs");
const utils = require('../utils');

exports.report = (req, res) => {
    // Read HTML Template
    var html = fs.readFileSync(__dirname + "/../report/template/general.template.html", "utf8");

    var options = {
        format: "A4",
        orientation: "landscape",
        border: "10mm",
    };

    var classes = [{
        name:'name',
        students:10,
        presences:10,
        ausences:0,
        visitors:1,
        audience:11,
        bibles:10,
        books:10,
        offers:10,
        percent:'100%'
    }];

    let dtRef = utils.date.dateLabel();
    let reportName = utils.date.reportDateLabel();

    let destinationPath = __dirname + `/../report/output/${reportName}.pdf`;

    var report = {
        html: html,
        data: {
            classes: classes,
            total: {
                students:10,
                presences:10,
                visitors:1,
                ausences:0,
                audience:11,
                bibles:10,
                books:10,
                offers:10,
                percent:'100%'
            },
            lastWeek: {
                students:10,
                presences:10,
                ausences:0,
                visitors:1,
                audience:11,
                bibles:10,
                books:10,
                offers:10,
                percent:'100%'
            },
            dt:dtRef,
            group:{name:'Quitandinha'}
        },
        path: destinationPath,
        type: "",
    }

    pdf.create(report, options)
    .then((result) => {
        console.log('Report criado!');
        console.log(result);

        //res.status(200).send({message: 'Report criado e disponível para download!'});
        res.download(destinationPath);
    })
    .catch((error) => {
        console.error('Ops! Erro no report!');
        console.error(error);

        res.status(500).send({message: 'O report não foi criado devido a um erro interno!'});
    });
}