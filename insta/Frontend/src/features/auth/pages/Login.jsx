import React from 'react'
import "../style/form.scss"
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'

const Login = () => {
  const [identifier, setidentifier] = useState("")
  const [password, setpassword] = useState("")

  const submithandler = async (e)=>{
    e.preventDefault()

    await axios.post("http://localhost:3000/api/auth/login",{
      identifier,
      password
    },{withCredentials: true})
    .then((res)=>{
      console.log(res.data)
    })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={submithandler}>
          <input 
            onInput={(e)=>{
              setidentifier(e.target.value)
            }}
            type="text" name='identifier' placeholder='Enter username / email' />
          <input 
            onInput={(e)=>{
              setpassword(e.target.value)
            }}
            type="password" name='password' placeholder='Enter password' />
          <button type='submit'>Login</button>
        </form>
        <p>Don't have any account ? <Link className='toggleAuthForm' to="/register">Register</Link> </p>
      </div>
    </main>
  )
}

export default Login