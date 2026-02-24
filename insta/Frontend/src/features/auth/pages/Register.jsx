import { useState } from 'react'
import {useAuth} from '../hooks/useAuth'
import "../style/form.scss"
import {Link} from 'react-router'
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const {loading, handleRegister} = useAuth()

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  
  const navigate = useNavigate()

  if(loading){
      return (
        <h1>Loading...</h1>
      )
    }

  const submithandler = async (e)=>{
    e.preventDefault()
    
    await handleRegister(username, email, password)
    .then((res)=>{
      console.log(res);
      navigate("/")
    })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submithandler} >
          <input 
            onInput={(e)=>{
              setusername(e.target.value)
            }}
            type="text" 
            name='username' 
            placeholder='Enter username' />
          <input 
            onInput={(e)=>{
              setemail(e.target.value)
            }}
            type="email" 
            name='email' 
            placeholder='Enter email' />
          <input 
            onInput={(e)=>{
              setpassword(e.target.value)
            }}
            type="password" 
            name='password' 
            placeholder='Enter password' />
          <button type='submit'>Register</button>
        </form>
        <p>Don't have any account ? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register