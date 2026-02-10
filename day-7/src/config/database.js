const mongoose = require("mongoose")

let connectToDB = ()=>{
  mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
      console.log("connected to database");
    })
}

module.exports = connectToDB