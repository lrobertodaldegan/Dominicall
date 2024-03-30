const mongoose = require("mongoose");

const Student = mongoose.model(
  "Dominicall_Student",
  new mongoose.Schema({
    name: String,
    since: String,
    number: String,
    churchMember: Boolean,
    clas: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Class'
    },
  })
);

module.exports = Student;