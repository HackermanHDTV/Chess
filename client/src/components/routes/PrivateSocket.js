import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { SocketProvider } from '../contexts/SocketContext'
import { useUser } from '../contexts/UserContext'
import NavBar from '../NavBar'

export default function PrivateSocket({ component: Component, ...rest }) {
  const { user } = useUser()
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
          <>
            <NavBar />
            <SocketProvider>
              <Component {...props} />
            </SocketProvider>
          </>
        ) : (
          <Redirect to='/login' />
        )
      }}
    ></Route>
  )
}
