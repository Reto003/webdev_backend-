const express = require("express")
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authRouter = express.Router()
/*
 *  register api
 */
authRouter.post('/register',async (req,res)=>{
  const {username, email, password} = req.body
  //~ 1st methid is this using findone() in userModel 
  const isUserAlreadyExist = await userModel.findOne({email})
  if(isUserAlreadyExist){
    return res.status(409).json({
      message : "this email is already registered"
    })
  }
  //~ 2nd method is try{}catch(err)
  // try{
    const user = await userModel.create({
      username,
      email,
      password: crypto.createHash('md5').update(password).digest('hex')
    })
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    )
    res.cookie("jwt_token",token)

    res.status(201).json({
      message: "user registered",
      user,
      token
    })
  // }catch(err){
  //   console.log(err.code)
  //   if(err.code === 11000){
  //     return res.status(409).json({
  //       message : "this email is already registered"
  //     })
  //   }
  // }
})

authRouter.post('/protected',(req,res)=>{
  console.log(req.cookies)
})

authRouter.post('/login',async (req,res)=>{
  const{email, password} = req.body

  const user = await userModel.findOne({email})
  // console.log(user)
  if(!user){
    return res.status(404).json({
      message : "user not found, invalid email"
    })
  }
  const hashed = crypto.createHash('md5').update(password).digest('hex')
  const isPasswordMatched = (user.password === hashed)
  if(!isPasswordMatched){
    return res.status(401).json({
      message : "invalid password"
    })
  }

  const token = jwt.sign(
    {
      id : user._id,
    },
    process.env.JWT_SECRET
  )
  res.cookie("jwt_token",token)
  
  res.status(201).json({
    message : "successfully login"
  })
})

authRouter.get('/get-me',async (req,res)=>{
  // code
})

module.exports = authRouter