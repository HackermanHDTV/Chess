import React from 'react'
import { Route } from 'react-router-dom'
import NavBar from '../NavBar'

export default function NavRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            <NavBar />
            <Component {...props} />
          </>
        )
      }}
    ></Route>
  )
}
