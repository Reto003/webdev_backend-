const postModel = require("../model/post.model")
const imageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const { Folders } = require("@imagekit/nodejs/resources.js")
const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")


const imagekit = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATEKEY
})


const createPostController = async (req,res)=>{
  console.log(req.body, req.file)
  // console.log(req.cookies)
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({
      message: "token not present, login again"
    })
  }
  
  let decoded = null
  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
  }catch(err){
    return res.status(401).json({
      message: "user noot authorized"
    })
  }
  
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),'file'),
    fileName: req.file.originalname,
    folder: "insta-clone"
  })
  // res.send(file)

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id
  })
  res.status(201).json({
    message: "post created successfully"
  })
}

const getPostsController = async (req,res)=>{
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({
      message: "u should loggedin"
    })
  }
  let decoded = null
  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
  }catch(err){
    return res.status(401).json({
      message: "kon hai tuu?"
    })
  }
  const userId = decoded.id
  const postData = await postModel.find({
    user: userId,
  })
  res.status(200).json({
    message: "post fetched successfully",
    postData
  })
}

const getPostDetailController = async (req,res)=>{
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({
      message: "UnAuthorized access"
    })
  }
  let decoded = null
  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }catch(err){
    return res.status(401).json({
      message: "tune ye post create nahi ki h"
    })
  }
  const userId = decoded.id
  const postId = req.params.postId
  const post = await postModel.findById(postId) 
  if(!post){
    return res.status(404).json({
      message: "post not found"
    })
  }
  const isUserValid = post.user.toString() === userId
  if(!isUserValid){
    return res.status(403).json({
      message: "forbidden content"
    })
  }
  res.status(200).json({
    message: "post fetched successfully",
    post
  })
}


module.exports = {
  createPostController,
  getPostsController,
  getPostDetailController,
}