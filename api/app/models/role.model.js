const mongoose = require("mongoose");

const Role = mongoose.model(
  "Dominicall_Role",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Role;