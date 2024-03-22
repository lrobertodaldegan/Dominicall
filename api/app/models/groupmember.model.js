const mongoose = require("mongoose");

const GroupMember = mongoose.model(
  "Dominicall_Group_Member",
  new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_User'
    },
    role: {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Role'
    },
    group:{
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Dominicall_Group'
    },
  })
);

module.exports = GroupMember;