import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import NavBar from '../NavBar'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useUser()

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
          <>
            <NavBar />
            <Component {...props} />
          </>
        ) : (
          <Redirect to='/login' />
        )
      }}
    ></Route>
  )
}
