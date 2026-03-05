const userModel = require("../models/user.model")
const blacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")



const registerUser = async (req,res)=>{
  const {username, email, password} = req.body

  const isUserAlreadyExist = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })
  if(isUserAlreadyExist){
    return res.status(400).json({
      message: "user with same email or username already exist"
    })
  }
  
  const hash = await bcrypt.hash(password,10)
  let user = null
  try{
    user = await userModel.create({
      username: username,
      email: email,
      password: hash,
    })
  }catch(err){
    console.log("somthing happens in register api",err)
    return res.status(500).json({ message: "registration failed" });
  }

  const token = jwt.sign({
    id: user._id,
  },process.env.JWT_SECRET,{expiresIn: "3d"})
  res.cookie("token", token)

  return res.status(201).json({
    message: "successfully reigistered",
    user
  })
}


const loginUser = async (req,res)=>{
  const {identifier, password} = req.body
  const user = await userModel.findOne({
    $or:[
      {username: identifier},
      {email: identifier}
    ]
  }).select("+password")
  if(!user){
    return res.status(404).json({
      // message: "user not exist,try another username or register yourself first",
      message: "invalid credentials"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if(!isPasswordValid){
    return res.status(401).json({
      // message: "invalid password" 
      message: "invalid credentials"
    })
  }

  const token = jwt.sign({
    id: user._id,
  },process.env.JWT_SECRET, {expiresIn: "3d"})
  res.cookie("token",token)

  res.status(201).json({
    message: "loggedin successfully"
  }) 
}


const getMe = async (req,res)=>{
  const userId = req.user.id
  const user = await userModel.findById(userId)
  return res.status(200).json({
    message: "profile fetched successfully",
    user
  })
}


const logoutUser = async (req,res)=>{
  const token = req.cookies.token
  res.clearCookie("token")

  // await blacklistModel.create({
  //   token: token
  // }
  await redis.set(token, Date.now().toString(), "EX", 60*60*24)

  return res.status(200).json({
    message: 'logout successfully'
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser, 
}