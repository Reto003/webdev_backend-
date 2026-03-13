const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")


const app = express()
app.use(express.json())
app.use(cookieParser())


const dotenv = require("dotenv")
dotenv.config()


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))


const { authRouter } = require("./routes/auth.route")
const {songRouter} = require("./routes/song.route")

app.use("/api/auth",authRouter)
app.use("/api/song",songRouter)



module.exports = app