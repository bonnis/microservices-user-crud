const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  role: {type: String, enum:['admin','user'],required: true},
  created_at: {type: Date, default:Date.now}
});

module.exports = mongoose.model("User", UserSchema);