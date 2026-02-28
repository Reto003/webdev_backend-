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
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "image file is required"
      })
    }

    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: req.file.originalname,
      folder: "insta-clone"
    })

    const post = await postModel.create({
      caption: req.body.caption,
      imgUrl: file.url,
      user: req.user.id
    })

    res.status(201).json({
      message: "post created successfully",
      post
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "failed to create post"
    })
  }
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
                                                          //! .sort({_id: -1})  mehtod for reverse order  
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

const likeController = async (req,res)=>{
  const username = req.user.username
  const postId = req.params.postId

  const post = await postModel.findById(postId)
  if(!post){
    return res.status(409).json({
      message: "there is no such post"
    })
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  })
  res.status(201).json({
    message: "post liked successfully",
    like
  })
}

const unlikeController = async (req,res)=>{
  const username = req.user.username
  const postId = req.params.postId

  const isLiked = await likeModel.findOne({
    post: postId,
    user: username,
  }) 
  if(!isLiked){
    return res.status(201).json({
      message: "u didn't liked it in firstPlace , and u expect for unlike it wow"
    })
  }

  await likeModel.findOneAndDelete({
    post: postId,
    user: username,
  })
  return res.status(201).json({
    message: "unliked successfully"
  })

}

// const getLikedPostController = async (req,res)=>{
//   const user = req.user
//   const allLikedPosts = await likeModel.find({
//     user: user.username,
//   }).populate(["post","user"])
//   res.status(201).json({
//     message:"successfully fetched liked posts",
//     allLikedPosts,
//   })
//   console.log(user.username)
// }

module.exports = {
  createPostController,
  getPostsController,
  getPostDetailController,
  getFeedController,
  likeController,
  unlikeController,
  // getLikedPostController
}
