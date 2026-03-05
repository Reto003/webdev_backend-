const ioredis = require("ioredis").default

const redis = new ioredis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
})

// here connect is like , click word in addeventlistner fxn
redis.on("connect",()=>{
  console.log("server is connected to redisDB");
})

module.exports = redis