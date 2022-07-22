import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { signIn } from '../../store/user'
import { useDispatch } from 'react-redux'
import './style.css'


export default function LoginForm() {
  const navigate = useNavigate()
  const loaction = useLocation()
  const dispatch = useDispatch()
  const [userName, setUsername] = useState('')
  const from = loaction.state?.from?.pathname || '/admin'
  const onChange = (e) => {
    const value = e.target.value
    setUsername(value)
  }
  const handleSubmit = () => {
    dispatch(signIn(userName))
    navigate(from, { replace: true, })
  }
  return (
    <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="user-box">
          <input type="text" required value={userName} onChange={onChange} />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input type="password" name="" required />
          <label>Password</label>
        </div>
        <a onClick={handleSubmit}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          登录
        </a>
      </form>
    </div>
  )
}
