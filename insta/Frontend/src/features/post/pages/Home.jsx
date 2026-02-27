import React from 'react'
import Nav from '../components/Nav'
import Feed from '../components/Feed'
import "../style/home.scss"

const Home = () => {
  
  return (
    <div className='home'>
      <Nav />
      <Feed/>
    </div>
  )
}

export default Home