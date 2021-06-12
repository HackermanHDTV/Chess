import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUser } from './contexts/UserContext'

export default function PublicRoute({ component: Component, ...rest }) {
  const { user } = useUser()

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Redirect to='/login' /> : <Component {...props} />
      }}
    ></Route>
  )
}
