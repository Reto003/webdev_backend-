const authController = require("../controllers/auth.controller")

const express = require("express")
const authRouter = express.Router()


/*
  * post  /api/auth/register
*/
authRouter.post("/register",authController.registerControlller)

/*
  * login  /api/auth/login
*/
authRouter.post("/login",authController.loginController)

module.exports = authRouter