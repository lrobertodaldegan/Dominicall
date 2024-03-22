const mongoose = require("mongoose");

const Code = mongoose.model(
  "Dominicall_Code",
  new mongoose.Schema({
    code: Number,
    used: Boolean,
    usefor: {
      type: String,
      enum:['resetpass', 'invite']
    },
    group: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Group'
    },
    role: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Role'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_User'
    }
  })
);

module.exports = Code;