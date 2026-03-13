const express = require("express")
const songRouter = express.Router()

const authController = require("../middlewares/auth.middleware")
const songController = require("../controllers/song.controller")

const upload = require("../middlewares/song.middleware")

songRouter.post("/upload", upload.single("song"), songController.uploadSong)

songRouter.get("/allsongs", songController.getSongs)



module.exports = {
  songRouter
}