import React from 'react'
import Player from '../components/Player'
import FaceExpression from '../../expressions/components/FaceExpression'
import "../../shared/styles/global.scss"
import { useSong } from '../hooks/useSong'


const Home = () => {
  const {handleGetSong} = useSong()

  return (
    <div>
      <h1>Welcome to Moodify</h1>
      <p>Discover songs that match your mood and elevate your music experience.</p>
      <FaceExpression onClick={(expression) => {handleGetSong({mood: expression}) }} />
      <Player/>
    </div>
  )
}

export default Home