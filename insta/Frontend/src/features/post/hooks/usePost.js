import {useContext} from 'react'
import {PostContext} from '../post.context.jsx'

export const usePost = ()=>{
  const context = useContext(PostContext)
  return context
}