import React, { useState, useRef, useEffect } from 'react'
import Axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

import { useUser } from '../contexts/UserContext'

import user from '../../assets/user.svg'
import lock from '../../assets/lock.svg'

export default function Login() {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
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
    confirmPasswordRef.current.value = ''
  }

  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    Axios({
      method: 'POST',
      url: 'https://chess-hdtv.herokuapp.com/api/signup',
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
    <div className='signup-form'>
      <form onSubmit={handleSubmit}>
        <span>Sign Up</span>
        {error && <div className='error'>{error}</div>}
        <div className='input-cont'>
          <img src={user} alt='' />
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
        <div className='input-cont'>
          <img src={lock} alt='' />
          <input
            type='password'
            ref={confirmPasswordRef}
            placeholder='Confirm Password'
            required
          />
        </div>
        <button disabled={isLoading} type='submit'>
          Sign Up
        </button>
        <div className='prompt'>
          Already have an account?<Link to='/login'> Log In</Link>
        </div>
      </form>
    </div>
  )
}
