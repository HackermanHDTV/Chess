import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/signup'
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoute'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <PrivateRoute path='/' exact component={Dashboard} />
      </Switch>
    </Router>
  )
}
