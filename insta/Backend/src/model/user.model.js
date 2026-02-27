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
    required:[true, "password is required"],
    select: false      // promlem in login time but it has solution in logincontroller use .select(+password)
  },
  bio: String,
  profileImage:{
    type: String,
    default: "https://ik.imagekit.io/kpk0d81oh/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg?updatedAt=1771168623728"
  }

});

const userModel = mongoose.model("users",userSchema)

module.exports = userModel
