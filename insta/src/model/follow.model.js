const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
  follower:{
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "users",
    type: String,
    required: true,
  },
  following:{
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "users",
    type: String,
    required: true,
  },
  status:{
    type: String,
    default: "pending",
    enum: {
      values: ["pennding", "accepted", "rejected", "blocked"],
      message: "status can only be pending, accepted or rejected or blocked"
    }
  }
},{timestamps: true})       // timestamps :- Automatically 2 fields add karta hai: 1.createdAt 2.updatedAt
followSchema.index({follower:1, following:1}, {unique:true})

const followModel = mongoose.model("follow",followSchema)
module.exports = followModel