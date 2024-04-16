const express = require("express");
 
const app = express();
 
// parse requests of content-type - application/json
app.use(express.json({limit:'50mb'}));
 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit:'50mb' }));
 
//start mongoose
const db = require("./app/models");
const Role = db.role;
const Student = db.student;
 
const dbConfig = require("./app/config/db.config");
 
db.mongoose
  .connect(`mongodb://${dbConfig.USER}:${dbConfig.PASS}@${dbConfig.HOST}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
 
function initial() {
  Role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        new Role({name: "Coordenador"})
        .save()
        .then(() => console.log("Role 'Coordenador' adicionado"))
        .catch(err => {
          if (err)
            console.log("Erro ao tentar adicionar Role 'Coordenador'", err);
        });
 
        new Role({name: "Professor"}).save()
        .then(() => console.log("Role 'Professor' adicionado"))
        .catch(err => {
          if (err)
            console.log("Erro ao tentar adicionar Role 'Professor'", err);
        });

        new Role({name: "Auxiliar"}).save()
        .then(() => console.log("Role 'Auxiliar' adicionado"))
        .catch(err => {
          if (err)
            console.log("Erro ao tentar adicionar Role 'Auxiliar'", err);
        });
      }
    })
    .catch(err => {
      if (err)
        console.log("error", err);
    });

    // const studentsToAdd = [
    //   {
    //     classId:'661d29360a6d606411ec2c66',//moises e miria
    //     students:[
    //       {
    //         name:'Davids Willian Cruz',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Julia Prates Daldegan',
    //         dn:'2017-04-18',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Leonardo Miguel',
    //         dn:'2015-02-27',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Luiza',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Murilo',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Nathaly Aparecida de Lima',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //     ]
    //   },
    //   {
    //     classId: '661bd13921114d12575a4202',//emanuel e hadassa
    //     students:[
    //       {
    //         name:'Ana Julia dos Santos',
    //         dn:'2004-05-02',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Bianca Monteiro',
    //         dn:'2009-07-28',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Eduardo Santos Batista',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Ellen',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Gabriel Palhano',
    //         dn:'2002-10-20',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Gabriela Monteiro',
    //         dn:'2006-08-04',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Leandro Martins do Nascimento',
    //         dn:'2006-05-15',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Lucas Gabriel Santos de Moraes',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Matheus Vasques',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Nathan de Jesus',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Vinicius Barbosa',
    //         dn:'2008-11-15',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Yasmin Luchtemberg',
    //         dn:'2007-01-09',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Gabriel de Lima',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //     ],
    //   },
    //   {
    //     classId: '661d8dbe750f0da5ac57ba16',//Josué e Debora
    //     students:[
    //       {
    //         name:'Amarildo de Jesus',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Arlam',
    //         dn:'1986-02-27',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Carlos José dos Santos',
    //         dn:'1970-11-29',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Carlos Martins',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Pr Carlos Toledo',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Cristiano',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Daniel Leopoldino',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Eleci Bortolozo',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Fabiele Luchtemberg',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Franciele A. L. Moreira',
    //         dn:'1991-05-26',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Gessé Antonio',
    //         dn:'1966-04-11',
    //         number:'36638102',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Ismael Luchtemberg',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Jean Carlos da Silva',
    //         dn:'1976-10-28',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Jorlanda',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Ketlyn França',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Lucas G. G. Pereira',
    //         dn:'1997-10-15',
    //         number:'96120042',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Lucas Pereira Barbosa',
    //         dn:'1994-04-19',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Lucas Roberto Daldegan',
    //         dn:'1995-10-03',
    //         number:'995429288',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Rute Nascimento',
    //         dn:'1980-01-24',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //     ]
    //   },
    //   {
    //     classId:'661bd3d021114d12575a42c4',//abraao e sara
    //     students:[
    //       {
    //         name:'Adilson',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Antonio Carlos do Nascimento',
    //         dn:'1974-09-26',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Antonio Manuel da Silva',
    //         dn:'1953-12-02',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Célio',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Eglai',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Félix',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Francisco Dias O. Filho',
    //         dn:'1964-03-07',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Isaque Luchtemberg',
    //         dn:'1948-12-15',
    //         number:'35626777',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'João Nogueira',
    //         dn:'1948-03-05',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Luiz Carlos Silveira Silva',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Mauro Cesar Martins',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Noel Cesar Martins',
    //         dn:'1980-12-28',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Osvaldino F. dos Santos',
    //         dn:'1943-06-29',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Reinaldo',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Roque F. Dias',
    //         dn:'1968-10-07',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Ivo',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Vilson',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Marisol',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Rose',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Deise',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Andrea Prates',
    //         dn:'1974-09-26',
    //         number:'36630187',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Cleize Radunz',
    //         dn:'1973-09-28',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Elizete Cardoso',
    //         dn:'1969-12-03',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Erika Cristina Cardoso Barbosa',
    //         dn:'1999-11-27',
    //         number:'987593753',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Francisca G. Rodrigues',
    //         dn:'1946-05-11',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Ilda',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Jéssica S. Prates Daldegan',
    //         dn:'1995-06-09',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Leosdete de Oliveira',
    //         dn:'1959-06-29',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Maria de Jesus Silva',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Marize Martins',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Marlene Borman',
    //         dn:'1956-04-31',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Raquel Barbosa Felicio',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Sandra Luchtemberg',
    //         dn:null,
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //       {
    //         name:'Zulenita do Nascimento',
    //         dn:'1956-06-27',
    //         number:'',
    //         since: 'Domingo 14/04/2024',
    //         member: true
    //       },
    //     ],
    //   }
    // ];

    // for(let i=0; i < studentsToAdd.length; i++){
    //   let classs = studentsToAdd[i];
      
    //   for(let j=0; j < classs.students.length; j++){
    //     let s = classs.students[j];

    //     let dataNascimento = new Date(s.dn);

    //     let newStudent = new Student({
    //       name: s.name,
    //       since: s.since,
    //       number: s.number,
    //       dn: dataNascimento.getTime(),
    //       churchMember: s.member === true,
    //       clas: classs.classId
    //     });

    //     newStudent.save().then(student => {
    //       console.log(`Estudante ${student.name} adicionado ( ${j} de ${classs.students.length} na classe)!`);
    //     });
    //   }
    // }
}
//end mongoose
 
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,UserAgent,X-Requested-With,Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,POST');
  res.header('Access-Control-Allow-Credentials', true);
 
  next();
});

// app.use((_req, res, next) => {
//  console.log(`Req: url: ${_req.url}, method: ${_req.method}, body: ${_req.body ? JSON.stringify(_req.body) : 'empty'}, query: ${_req.query ? JSON.stringify(_req.query) : 'empty'}, path:${_req.params ? JSON.stringify(_req.params) : 'empty'}, headers: ${JSON.stringify(_req.headers)}`);

//  next();
// });
 
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/clas.routes')(app);
require('./app/routes/group.routes')(app);
require('./app/routes/report.routes')(app);
require('./app/routes/finance.routes')(app);
require('./app/routes/license.routes')(app);

app.all('*', [], (req, res, next) => {
  return res.status(404).send({message: 'Ops! Não tem nada aqui!'});
})
 
// set port, listen for requests
const PORT = 21017;
app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}.`);
});