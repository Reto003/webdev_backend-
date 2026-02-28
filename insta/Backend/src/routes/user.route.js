const express = require("express")
const userRouter = express.Router()

const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")


userRouter.post("/follow/:username", identifyUser, userController.followUserController)
userRouter.patch("/follow/accept/:username", identifyUser, userController.accceptFollowReqController)
userRouter.patch("/follow/reject/:username", identifyUser, userController.rejectFollowReqController)

userRouter.delete("/unfollow/:username", identifyUser, userController.unfollowUserController)

userRouter.get("/followers", identifyUser, userController.allFollowersController)

module.exports = userRouter
