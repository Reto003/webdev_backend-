import React from 'react'
import "../styles/login.scss"

const Login = () => {
  return (
    <main className='login-page'>
      <div className="form-container">
        <h1>login</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" required/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login