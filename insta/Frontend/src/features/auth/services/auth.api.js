import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
})

export const register = async (username, email, password)=>{
  try{
    const response = await api.post("/register",{
      username,
      email,
      password,
    })
    return response.data
  }catch(err){ 
    throw err
  }
}


export const login = async (identifier, password)=>{
  try{
    const response = await api.post("/login",{
      identifier,     //identifier can be username or password
      password,
    })    
    return response.data
  }catch(err){
    throw err
  }
}


const getMe = async ()=>{
  const response = await api.get()
  return res
}
