const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const blacklistModel = require("../models/blacklist.model")
const redis = require("../config/cache")

const identifyUser = async (req,res,next)=>{
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({
      message: "unAuthorized access"
    })
  }
  //~ using mongo but low throughput
  // const isTokenBlacklisted = await blacklistModel.findOne({
  //   token
  // })
  //~ using redis high throughput
  const isTokenBlacklisted = await redis.get(token)

  if(isTokenBlacklisted){
    return res.status(401).json({
      message: "invalid token"
    })
  }

  try{    //using try cause if token expires but it avalible so it give as error
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    )
    req.user = decoded
    next()
  }catch(err){
    return res.status(401).json({
      message: "invalid token"
    })
  }
}


module.exports = {
  identifyUser
}