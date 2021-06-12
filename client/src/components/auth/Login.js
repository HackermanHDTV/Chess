import React, { useState, useRef } from 'react'
import Axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

import { useUser } from '../contexts/UserContext'

export default function Login() {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { setLocalUser } = useUser()
  const history = useHistory()

  function clearFields() {
    usernameRef.current.value = ''
    passwordRef.current.value = ''
  }

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

    Axios({
      method: 'POST',
      url: 'http://192.168.1.9:5000/api/login',
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
    <form onSubmit={handleSubmit}>
      <div>Login</div>
      {error && <div>{error}</div>}
      <div>
        <label>Username</label>
        <input ref={usernameRef} />
      </div>
      <div>
        <label>Password</label>
        <input type='password' ref={passwordRef} />
      </div>
      <button disabled={isLoading} type='submit'>
        Log In
      </button>
      <div>
        Don't have an account?<Link to='/signup'>Sign up</Link>
      </div>
    </form>
  )
}
