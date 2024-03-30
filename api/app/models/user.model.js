const mongoose = require("mongoose");

const User = mongoose.model(
  "Dominicall_User",
  new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    license: String,
  })
);

module.exports = User;