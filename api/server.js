const express = require("express");
 
const app = express();
 
// parse requests of content-type - application/json
app.use(express.json({limit:'50mb'}));
 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit:'50mb' }));
 
//start mongoose
const db = require("./app/models");
const Role = db.role;
 
const dbConfig = require("./app/config/db.config");
 
db.mongoose
  .connect(`mongodb+srv://${dbConfig.USER}:${dbConfig.PASS}@${dbConfig.HOST}`, {
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
//  console.log(`Req: body: ${_req.body ? JSON.stringify(_req.body) : 'empty'}, query: ${_req.params ? JSON.stringify(_req.params) : 'empty'}`);

//  next();
// });
 
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/clas.routes')(app);
require('./app/routes/group.routes')(app);
require('./app/routes/report.routes')(app);

app.all('*', [], (req, res, next) => {
  return res.status(404).send({message: 'Ops! Não tem nada aqui!'});
})
 
// set port, listen for requests
const PORT = 21017;
app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}.`);
});