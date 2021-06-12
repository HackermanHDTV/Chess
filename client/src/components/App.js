import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoute'
import { UserProvider } from './contexts/UserContext'

export default function App() {
  return (
    <Router>
      <Switch>
        <UserProvider>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <PrivateRoute path='/' exact component={Dashboard} />
        </UserProvider>
      </Switch>
    </Router>
  )
}
