const mongoose = require("mongoose");

const Presence = mongoose.model(
  "Dominicall_Presence",
  new mongoose.Schema({
    dt: String,
    bible: Boolean,
    book: Boolean,
    student:{
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Student'
    },
    clas: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Class'
    },
  })
);

module.exports = Presence;