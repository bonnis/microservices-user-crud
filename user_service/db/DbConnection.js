const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const serverURI = process.env.DATABASE_URL || "mongodb://mongodb_user/user";

const seedUser = [
  {
    name:'Admin',
    username:'admin1',
    password: bcrypt.hashSync('secret',5),
    role:'admin'
  },
  {
    name:'User Biasa',
    username:'user1',
    password: bcrypt.hashSync('secret',5),
    role:'user'
  },
]

const connect = ()=>{
    mongoose.connect(serverURI, { useNewUrlParser: true })
      .then(function() {
        console.log("Database connection successful");

        User.find({username:'admin1'},(err, user)=>{
          if(err || !user.length){
            let newuser = new User(seedUser[0])
            newuser.save()
          }else{
            User.updateOne({username:'admin1'}, {$set:seedUser[0]})
          }
          console.log("Seeded Admin")
        })
        User.find({username:'user1'},(err, user)=>{
          if(err || !user.length){
            let newuser = new User(seedUser[1])
            newuser.save()
          }else{
            User.updateOne({username:'user1'}, {$set:seedUser[1]})
          }
          console.log("Seeded User")
        })
      })
      .catch(function(err) {
        console.error("Database connection error");
        console.log( err);
        console.log("Retrying in 5 seconds ...")
        setTimeout(connect, 5000);
      });
}

class DBConnection {
  constructor() {
    this._connect();
  }
  _connect() {
    connect()
  }
}

module.exports = new DBConnection