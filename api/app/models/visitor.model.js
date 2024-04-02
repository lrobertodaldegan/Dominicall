const mongoose = require("mongoose");

const Visitor = mongoose.model(
  "Dominicall_Visitor",
  new mongoose.Schema({
    dt: String,
    name: String,
    number: String,
    clas: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Class'
    },
  })
);

module.exports = Visitor;