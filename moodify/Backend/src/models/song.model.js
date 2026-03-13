const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
  url:{
    type: String,
    required: [true, "url is requried"],
  },
  posterUrl:{
    type: String,
    default: "https://tse1.mm.bing.net/th?id=OIP.7n9s8l2XoQh0jKZy3mLz5gHaHa&pid=Api&P=0",
    // required: [true]
  },
  title:{
    type: String,
    default: "",
    // required: true
  },
  mood:{
    type: String,
    enum: {
      values: ["sad", "happy", "surprised"],
      messge: "This is Enum"
    }
  }
})
const songModel = mongoose.model("songs", songSchema)

module.exports = {
  songModel
}