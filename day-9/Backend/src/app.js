const path = require("path")
const cors = require("cors")
const noteModel = require("./model/note.model")
const express = require("express")
const { ppid } = require("process")
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("./public"))
/*
  *- post: /api/notes
  *- create new node and save data in mongoDB
  *- req.body = {title , description}
*/
app.post("/api/notes",async (req,res)=>{
  const {title,description} = req.body;
  const note = await noteModel.create({
    title,
    description,
  })
  res.status(201).json({
    message: ("note created successfully"),
    note
  })
})

/*
  *- get: /api/notes
  *- Fetch all the notes data from MongoDB and send them in the response
*/
app.get("/api/notes",async (req,res)=>{
  const notes = await noteModel.find()
  res.status(200).json({
    message: " notes fetched successfully",
    notes
  })
})
/*
  *- Delete : /api/notes/id
  *-  delete note with id from req.params
*/
app.delete("/api/notes/:id",async (req,res)=>{
  const id = req.params.id
  await noteModel.findByIdAndDelete(id)
  // console.log(id)
  res.status(200).json({
    message: "note deleted successfully"
  })
})

app.patch('/api/notes/:id',async (req,res)=>{
  const id = req.params.id
  const{description} = req.body
  await noteModel.findByIdAndUpdate(id)
  res.status(200).json({
    message: "updated successfully"
  })
})

app.use('*name',(req,res)=>{
  // res.send("this is wildcard")
  res.sendFile(path.join(__dirname, "../public/index.html"));
})



module.exports = app

