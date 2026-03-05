const app = require("./src/App.js")
const connectToDB = require("./src/config/database.js")

connectToDB()

app.listen("3000",()=>{
  console.log("server is running on port 3000")
})