const mongoose = require("mongoose");

const Group = mongoose.model(
  "Dominicall_Group",
  new mongoose.Schema({
    name: Number,
    owner: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_User'
    }
  })
);

module.exports = Group;