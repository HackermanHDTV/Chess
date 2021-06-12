import React, { useState, useRef } from 'react'
import Axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

import { useUser } from '../contexts/UserContext'

export default function Login() {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { setLocalUser } = useUser()
  const history = useHistory()

  function clearFields() {
    usernameRef.current.value = ''
    passwordRef.current.value = ''
    confirmPasswordRef.current.value = ''
  }

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

    if (!usernameRef.current.value) {
      setError('Please enter username')
      setIsLoading(false)
      return
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    if (!passwordRef.current.value) {
      setError('Please enter password')
      setIsLoading(false)
      return
    }

    Axios({
      method: 'POST',
      url: 'http://192.168.1.9:5000/api/signup',
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
        setError('Could not sign up')
        clearFields()
        console.error(err)
        setIsLoading(false)
      })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>Sign Up</div>
      {error && <div>{error}</div>}
      <div>
        <label>Username</label>
        <input ref={usernameRef} />
      </div>
      <div>
        <label>Password</label>
        <input type='password' ref={passwordRef} />
      </div>
      <div>
        <label>Confirm Password</label>
        <input type='password' ref={confirmPasswordRef} />
      </div>
      <button disabled={isLoading} type='submit'>
        Sign Up
      </button>
      <div>
        Already have an account?<Link to='/login'>Log In</Link>
      </div>
    </form>
  )
}
