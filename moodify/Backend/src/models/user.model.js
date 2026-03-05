const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true,'username is required'],
    unique: [true,"this username already taken"],
  },
  email:{
    type:String,
    required: [true,"email is required"],
    unique: [true, "this email address is already registered"]
  },
  password:{
    type: String,
    required:[true, "password is required"],
    select: false,
  }
})

const userModel = mongoose.model("users",userSchema)


module.exports = userModel