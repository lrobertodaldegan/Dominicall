const mongoose = require("mongoose");

const Clas = mongoose.model(
  "Dominicall_Class",
  new mongoose.Schema({
    name: String,
    group: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Group'
    },
  })
);

module.exports = Clas;