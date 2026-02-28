import { createContext, useState, useEffect } from "react";
import {getFeed, createPost, likePost, unlikePost} from '../post/services/post.api'


export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [post, setpost] = useState(null)
  const [feed, setfeed] = useState([]) 
  const [likedPost, setlikedPost] = useState([])

  const handleGetFeed = async ()=>{
    setloading(true)
    const data = await getFeed()
    setfeed(data.allPosts.reverse())
    setloading(false)
  }
  
  const handleCreatePost = async (imageFile, caption)=>{
    setloading(true)
    try {
      const data = await createPost(imageFile, caption)
      if (data?.post) {
        setfeed([data.post, ...feed])
      }
    }finally {
      setloading(false)
    }
  }

  const handleLikedFeed = async ()=>{
    setloading(true)
    const data = await getFeed()
    setfeed(data.allPosts)
    setloading(false)
  }

  useEffect(()=>{
    handleGetFeed()
  },[])

  const handleLike = async (post)=>{
    const data = await likePost(post)
    await handleGetFeed()
  }
  const handleUnLike = async (post)=>{
    const data = await unlikePost(post)
    await handleGetFeed()
  }


  return (
    <PostContext.Provider value={{loading, post, feed, handleGetFeed, handleCreatePost, handleLikedFeed, handleLike, handleUnLike}} >
      {children}
    </PostContext.Provider>
  )
}
