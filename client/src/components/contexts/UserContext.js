import Axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

require('dotenv').config()

const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [user, setUser] = useState()
  const history = useHistory()

  function setLocalUser(user) {
    setUser(user)
    localStorage.setItem('userid', user._id)
  }

  function logout() {
    setUser()
    localStorage.setItem('userid', '')
  }

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userid')
    if (
      loggedInUserId &&
      loggedInUserId !== 'undefined' &&
      loggedInUserId !== 'null' &&
      loggedInUserId !== ''
    ) {
      Axios({
        method: 'GET',
        params: { id: loggedInUserId },
        url: `${process.env.REACT_APP_SERVER_URL}/api/user`,
      })
        .then((res) => {
          setUser(res.data)
          history.push('/')
        })
        .catch((e) => console.error(e))
    }
  }, [history])

  const value = {
    user,
    setLocalUser,
    logout,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
