const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()}) 

/*
  - post  /api/post/upload  [protected (means token should be present)]
 */
postRouter.post("/upload",upload.single("image"),postController.createPostController)

/**
  - get  /api/post/getPosts
 */
postRouter.get("/getPosts",postController.getPostsController)

/**
  - get  /api/post/details/:post
  return an detail about specific post with the id and also check whether the post belongs to the user that request comes from
 */
postRouter.get("/details/:postId",postController.getPostDetailController)



module.exports = postRouter