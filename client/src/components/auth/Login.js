import React, { useState, useRef, useEffect } from 'react'
import Axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
require('dotenv').config()

import { useUser } from '../contexts/UserContext'

import userLogo from '../../assets/user.svg'
import lock from '../../assets/lock.svg'

export default function Login() {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { setLocalUser } = useUser()
  const history = useHistory()

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  function clearFields() {
    usernameRef.current.value = ''
    passwordRef.current.value = ''
  }

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

    Axios({
      method: 'POST',
      url: `${process.env.SERVER_API}/api/login`,
      data: {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      },
    })
      .then((res) => {
        setLocalUser(res.data)
        history.push('/')
      })
      .catch((err) => {
        setError('Could not log in')
        clearFields()
        setIsLoading(false)
        console.error(err)
      })
  }

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        <span>Log In</span>
        {error && <div className='error'>{error}</div>}
        <div className='input-cont'>
          <img src={userLogo} alt='' />
          <input ref={usernameRef} placeholder='Username' required />
        </div>
        <div className='input-cont'>
          <img src={lock} alt='' />
          <input
            type='password'
            ref={passwordRef}
            placeholder='Password'
            required
          />
        </div>
        <button disabled={isLoading} type='submit'>
          Log In
        </button>
        <div className='prompt'>
          Don't have an account?<Link to='/signup'> Sign up</Link>
        </div>
      </form>
    </div>
  )
}
