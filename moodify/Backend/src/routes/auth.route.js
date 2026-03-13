// const express = require("express")
// const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
const {Router} = require("express")
const authRouter = Router()

//import middaleware
const authMiddleware = require("../middlewares/auth.middleware")


authRouter.post("/register", authController.registerUser)
authRouter.post("/login", authController.loginUser)
authRouter.get("/getme", authMiddleware.identifyUser, authController.getMe)
authRouter.get("/logout", authController.logoutUser)

module.exports = {
  authRouter, 
}