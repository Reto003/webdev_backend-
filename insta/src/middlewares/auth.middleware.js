const jwt = require("jsonwebtoken")

const identifyUser = (req, res, next)=>{
  // console.log(req.cookies)
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
  req.user = decoded
  next()
}

module.exports = identifyUser