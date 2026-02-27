import { createContext, useState } from "react";
import {getFeed} from '../post/services/post.api'


export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [post, setpost] = useState(null)
  const [feed, setfeed] = useState([]) 

  const handleGetFeed = async ()=>{
    setloading(true)
    const data = await getFeed()
    setfeed(data.allPosts)
    setloading(false)
  }
  

  return (
    <PostContext.Provider value={{loading, post, feed, handleGetFeed}} >
      {children}
    </PostContext.Provider>
  )
}
