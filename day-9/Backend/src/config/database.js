const mongoose = require("mongoose")

const connectToDB = ()=>{
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("connected to database")
  })
}

module.exports = connectToDB