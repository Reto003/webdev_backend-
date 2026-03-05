const mongoose = require("mongoose")

const connectToDB = async (req,res)=>{
  await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
      console.log("connected to DataBase")
    })
    .catch(err=>{
      console.log("Something wrong",err)
    })
}


module.exports = connectToDB