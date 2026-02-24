import "../style/form.scss"
import { Link } from 'react-router-dom'
import {useState} from 'react'
import {useAuth} from '../hooks/useAuth'
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const {loading, handleLogin} = useAuth()

  const [identifier, setidentifier] = useState("")
  const [password, setpassword] = useState("")

  const navigate = useNavigate()

  if(loading){
      return(
        <h1>Loading...</h1>
      )
  }
  const submithandler = async (e)=>{
    e.preventDefault()

    await handleLogin(identifier, password)
    .then((res)=>{
      console.log(res);
      navigate("/")
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