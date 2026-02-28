import React from 'react'
import Nav from '../components/Nav'
import Feed from '../components/Feed'
import "../style/home.scss"
import {Outlet} from 'react-router-dom'

const Home = () => {
  
  return (
    <div className='home'>
      <Nav />
      <Outlet/>
    </div>
  )
}

export default Home