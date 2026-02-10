const app = require("./src/app")
const mongoose = require("mongoose")
const connectToDB = require("./src/config/database")
require("dotenv").config()

connectToDB()

app.listen("3000",()=>{
  console.log("server is running at port 3000");
})
