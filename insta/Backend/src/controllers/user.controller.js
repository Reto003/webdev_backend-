const followModel = require("../model/follow.model")
const userModel = require("../model/user.model")
const likeModel = require("../model/like.model")
const postModel = require("../model/post.model")
// const { create } = require("../model/post.model")

// follow controller
const followUserController = async (req, res)=>{
  // console.log(req.user.id)
  const followerUser = req.user.username
  const followingUser = req.params.username
  // some cheacks
  if(followerUser === followingUser){
    return res.status(400).json({
      message: "you can't follow yourself"
    })
  }
  const isFolloweeExist = await userModel.findOne({username: followingUser})
  if(!isFolloweeExist){
    return res.status(404).json({
      message: "user u trying to follow doesn't exist"
    })
  }

  const followRecord = await followModel.create({
    follower: followerUser,
    following: followingUser,
    status:"pennding",
  })
  res.status(200).json({
    message: "follow request sent successfully",
    followRecord
  })
}
const accceptFollowReqController = async (req,res)=>{
  const followerUser = req.params.username
  const currentUser= req.user.username

  const updated = await followModel.findOneAndUpdate({
    follower: followerUser,
    following: currentUser,
    status: "pennding"
  },{status:"accepted"},{new:true})
  res.status(201).json({
    message: "follow request accepted"
  })
}
const rejectFollowReqController = async (req,res)=>{
  const followerUser = req.params.username
  const currentUser = req.user.username

  const updated = await followModel.findOne({
    follower: followerUser,
    following: currentUser,
    status:"penndeng"
  },{status:"rejected"},{new:"true"})
}

const unfollowUserController = async (req, res)=>{
  const followerId = req.user.username
  const followingId = req.params.username
  
  await followModel.findOneAndDelete({
    follower: followerId,
    following: followingId,
  })
  res.status(200).json({
    message: "unfollowed successfully",
  })
}

const allFollowersController = async (req,res)=>{
  const followerId = req.user.id
  const followers = await  followModel.find({follower: followerId})
  // .populate("")
  if(!followers){
    return res.status(404).json({
      message: " you don't have any followers"
    })
  }
  res.status(200).json({
    message: "followers fetched successfully",
    followers
  })
}

const allFollowingsController = async (req,res)=>{

}

//like controllers
// const likeController = async (req,res)=>{
//   const username = req.user.username
//   const postId = req.params.id
  
//   // // const post = await postModel.findById(postId)
//   // // if(!post){
//   // //   return res.status(404).json({
//   // //     message: "post doesn't exist"
//   // //   })
//   // // }

//   // if we don't cheack this, fir bhi ye like nhi hota kyuki hamne index({post:1,user:1}) kar rakhi h in likeModel, but still ye karna achhi baat h
//   const isAlreadyLiked = await likeModel.findOne({
//     post: postId,
//     user: username,
//   }) 
//   if(isAlreadyLiked){
//     return res.status(201).json({
//       message: "you already liked it"
//     })
//   }

//   const likeRecord = await likeModel.create({
//     post: postId,
//     user: username,
//   })
//   res.status(201).json({
//     message: "post liked successfully",
//     likeRecord
//   })
// }

// const unlikeController = async (req,res)=>{
//   const username = req.user.username
//   const postId = req.params.id

//   const isLiked = await likeModel.findOne({
//     post: postId,
//     user: username,
//   }) 
//   if(!isLiked){
//     return res.status(201).json({
//       message: "u didn't liked it in firstPlace , and u expect for unlike it wow"
//     })
//   }

//   await likeModel.findOneAndDelete({
//     post: postId,
//     user: username,
//   })
//   res.status(201).json({
//     message: "unliked successfully"
//   })

// }

module.exports = {
  followUserController,
  unfollowUserController,
  allFollowersController,
  allFollowingsController,
  accceptFollowReqController,
  rejectFollowReqController,
}