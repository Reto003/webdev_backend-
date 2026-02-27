const postModel = require("../model/post.model")
const imageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const { Folders } = require("@imagekit/nodejs/resources.js")
const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")
const likeModel = require("../model/like.model")

const imagekit = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATEKEY
})


const createPostController = async (req,res)=>{
  console.log(req.body, req.file)

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),'file'),
    fileName: req.file.originalname,
    folder: "insta-clone"
  })
  // res.send(file)

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id
  })
  res.status(201).json({
    message: "post created successfully"
  })
}

const getPostsController = async (req,res)=>{
  
  const userId = req.user.id
  const postData = await postModel.find({
    user: userId,
  })
  res.status(200).json({
    message: "post fetched successfully",
    postData
  })
}

const getPostDetailController = async (req,res)=>{
  
  const userId = req.user.id
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

const getFeedController = async (req,res)=>{
  const user = req.user

  const allPosts = await Promise.all((await postModel.find().populate("user").lean()) //we used .lean() coz moonge not add new elem without this like here we r trying to add isliked
    .map(async (post)=>{       // <- we made it async meanns now it return promises so we have to wrap all thing with await promise.all() it resolve all promise 
      // console.log(post.caption)
      const isliked = await likeModel.findOne({
        user: user.username,
        post: post._id,
      })
      // console.log(typeof post)
      post.isliked = Boolean(isliked)
      return post
    }))

  res.status(201).json({
    message: "feed generated successfully",
    allPosts,
  })
} 


module.exports = {
  createPostController,
  getPostsController,
  getPostDetailController,
  getFeedController
}