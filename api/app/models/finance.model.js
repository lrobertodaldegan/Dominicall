const mongoose = require("mongoose");

const Finance = mongoose.model(
  "Dominicall_Finance",
  new mongoose.Schema({
    dt: String,
    title: String,
    value: Number,
    type: String,
    group: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Group'
    }
  })
);

module.exports = Finance;