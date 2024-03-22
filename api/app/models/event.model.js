const mongoose = require("mongoose");

const Event = mongoose.model(
  "Dominicall_Class_Event",
  new mongoose.Schema({
    dt: String,
    name: String,
    teacher: String,
    clas: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Class'
    },
  })
);

module.exports = Event;