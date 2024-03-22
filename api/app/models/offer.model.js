const mongoose = require("mongoose");

const Offer = mongoose.model(
  "Dominicall_Offer",
  new mongoose.Schema({
    dt: String,
    offerer: String,
    value: Number,
    clas: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Class'
    },
  })
);

module.exports = Offer;