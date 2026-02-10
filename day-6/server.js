const app = require("./src/app");
const mongoose = require("mongoose");

app.listen("3000", () => {
  console.log("server is runnning on port 3000");
});

let connectToDb = () => {
  mongoose.connect("mongodb+srv://raj20051104_db_user:SSNy45wMRojsnREc@cluster0.lvk8nvp.mongodb.net/day-6",)
    .then(() => {
      console.log("connected to database");
    });
};
connectToDb()