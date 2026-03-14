import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:3000/api/song",
  withCredentials: true
})

export const getSongs = async ({mood})=>{
  const response = await api.get("/allsongs?mood="+mood)
  return response.data
}