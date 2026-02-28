const authController = require("../controllers/auth.controller")
const identifyUser = require("../middlewares/auth.middleware")

const express = require("express")
const authRouter = express.Router()


/*
  * post  /api/auth/register
*/
authRouter.post("/register", authController.registerControlller)

/*
  * login  /api/auth/login
*/
authRouter.post("/login", authController.loginController)

/*
 *  login   /api/auth/getme  
 */
authRouter.get("/getme", identifyUser, authController.getmeController)


module.exports = authRouter