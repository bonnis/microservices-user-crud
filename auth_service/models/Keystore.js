const mongoose = require('mongoose')

const KeystoreSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  status: {type: Boolean, required: true},
  type: {type:String, required:true, enum:['acc','ref'], default:"acc"}
}, {timestamps:true});

module.exports = mongoose.model("Keystore", KeystoreSchema);