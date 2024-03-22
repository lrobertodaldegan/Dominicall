const mongoose = require("mongoose");

const ClassTeacher = mongoose.model(
  "Dominicall_Class_Teacher",
  new mongoose.Schema({
    order: Number,
    teacher: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Group_Member'
    },
    clas: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Class'
    },
  })
);

module.exports = ClassTeacher;