const express = require("express")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
dotenv.config()


const app = express()
app.use(express.json())
app.use(cookieParser())




const { authRouter } = require("./routes/auth.route")


app.use("/api/auth",authRouter)



module.exports = app