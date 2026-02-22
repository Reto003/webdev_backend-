const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    unique: [true,"username already exist, try another username"],
    required: [true, "username is required"],
  },
  email:{
    type: String,
    unique: [true,"This email is already registered"],
    required: [true, "Email is required"],
  },
  password:{
    type: String,
    required:[true, "password is required"]
  },
  bio: String,
  profileImage:{
    type: String,
    default: "https://ik.imagekit.io/kpk0d81oh/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg",
  }

});

const userModel = mongoose.model("users",userSchema)

module.exports = userModel
