const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.clas = require("./clas.model");
db.code = require("./code.model");
db.user = require("./user.model");
db.role = require("./role.model");
db.event = require("./event.model");
db.group = require("./group.model");
db.offer = require("./offer.model");
db.student = require("./student.model");
db.visitor = require("./visitor.model");
db.presence = require("./presence.model");
db.groupmember = require("./groupmember.model");
db.classteacher = require("./classteacher.model");

module.exports = db;