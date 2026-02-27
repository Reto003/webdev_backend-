import {createContext, useState, useEffect} from 'react'
import {register, login} from './services/auth.api'

export const AuthContext = createContext()

export function AuthProvider({children}){
  const [user, setuser] = useState({})
  const [loading, setloding] = useState(false)

  const handleRegister = async (username, email, password)=>{
    setloding(true)
    try{
      const response = await register(username, email, password) 
      setuser(response.user)
      console.log(response.user);
    }catch(err){
      throw err
    }
    finally{
      setloding(false)
    }
  }

  const handleLogin = async (identifier, password)=>{
    setloding(true)
    try{
      const response = await login(identifier, password)
      setuser(response.user)
      console.log(response.user);
    }catch(err){
      throw err
    }
    finally{
      setloding(false)
    }
  }

  return(
    <AuthContext.Provider value={{user, loading, handleRegister, handleLogin}}>
      {children}
    </AuthContext.Provider>
  )
}