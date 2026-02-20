const mongoose = require("mongoose")

const postScehma = new mongoose.Schema({
  caption: {
    type: String,
    default: ""
  },
  imgUrl: {
    type: String,
    required: [true,"imgUrl is required for post"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true,"user id is required for creating post"]
  }
})

const postModel = mongoose.model("posts",postScehma)

module.exports = postModel