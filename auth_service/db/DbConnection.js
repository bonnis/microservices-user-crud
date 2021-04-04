const mongoose = require('mongoose')

const serverURI = process.env.DATABASE_URL || "mongodb://mongodb_auth/auth";

const connect = ()=>{
    mongoose.connect(serverURI, { useNewUrlParser: true })
      .then(function(){
        console.log("Database connection successful");
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