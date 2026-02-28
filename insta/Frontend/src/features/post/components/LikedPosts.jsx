import React from 'react'
import Post from './Post'
import {usePost} from '../hooks/usePost'
import {useEffect} from 'react'

const LikedPosts = () => {
  const {loading, feed, handleGetFeed} = usePost()
  
    useEffect(()=>{
      handleGetFeed()
    },[])
    if(loading){
      return (
        <main>
          <h1>feed is loading...</h1>
        </main>
      )
    }
    console.log(feed)
  

  return (
    <div className="feed-page">
      {feed.map((post,idx)=>{
        // console.log(post.user)
        if(post.isliked){
          return (<Post key={idx} user={post.user} post={post} /> )
        }
      })}
    </div>
  )
}

export default LikedPosts