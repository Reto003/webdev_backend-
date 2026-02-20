const userModel = require("../model/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const registerControlller = async (req,res)=>{
  const {username, email, password, bio, profileImage} = req.body

  // const isUserExistbyEmail = await userModel.findOne({email})
  // const isUserExistbyUsername = await userModel.findOne({username})
  // if(isUserExistbyEmail){
  //   return res.status(409).json({
  //     message: "this email is already registered"
  //   })
  // }
  // if(isUserExistbyUsername){
  //   return res.status(409).json({
  //     message: "this username is already exist"
  //   })
  // }

  const isuserAlreadyExist = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })
  if(isuserAlreadyExist){
    return res.status(409).json({
      message: "User already exist"+","+(isuserAlreadyExist.email === email ? "email already exist":"username already exist")
    })
  }

  // const hash = crypto.createHash("sha256").update(password).digest("hex")
  const hash = await bcrypt.hash(password,10)   //change simple password into hash using bcrypt

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  })
  const token = jwt.sign(
    {id: user._id,},
    process.env.JWT_SECRET,
    {expiresIn: "1d"},
  )
  res.cookie("token",token)
  res.status(201).json({
    message: "user registered successfully",
    user:{
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    }
  })
}

const loginController = async (req,res)=>{
  const {username,email,password} = req.body
  //* username ke basis par ya fir email ke basis par (koi ek )
  const user = await userModel.findOne({
    $or:[
      {username},
      {email},
    ]
  })
  if(!user){
    return res.status(404).json({
      message: "user not exist,try another username or register yourself first"
    })
  }
  // const hashed = crypto.createHash("sha256").update(password).digest("hex")
  // const isPasswordValid = (user.password === hashed)
  const isPasswordValid = await bcrypt.compare(password,user.password)
  if(!isPasswordValid){
    return res.status(401).json({
      message: "invalid password"
    })
  }
  const token = jwt.sign(
    {
      id: user._id
    },
    process.env.JWT_SECRET,
    {expiresIn: '1d'}
  )
  res.cookie("token",token)

  res.status(201).json({
    message: "successfully logged in",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage, 
    },
  })
}

module.exports = {
  registerControlller,
  loginController,
}
