import { useContext } from "react";
import { songContext } from "../song.context";
import { getSongs } from "../services/song.api.js";

export const useSong = ()=>{
  const context = useContext(songContext)
  const {song, setSong, loading, setLoading} = context

  const handleGetSong = async ({mood})=>{
    setLoading(true)
    const data = await getSongs({mood})
    setSong(data.song)
    setLoading(false)
  }


  return ({song, loading, handleGetSong})
}