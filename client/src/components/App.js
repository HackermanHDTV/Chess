import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import '../scss/styles.scss'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Dashboard from './dashboard/Dashboard'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import NavRoute from './routes/NavRoute'
import { UserProvider } from './contexts/UserContext'
import PlayOnline from './chess/chess-components/PlayOnline'
import PlayLocal from './chess/chess-components/PlayLocal'
import Analysis from './chess/chess-components/Analysis'
import Profile from './dashboard/Profile'
import { ChessProvider } from './contexts/ChessContext'
import PrivateSocket from './routes/PrivateSocket'

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <UserProvider>
            <PublicRoute path='/login' component={Login} />
            <PublicRoute path='/signup' component={Signup} />
            <NavRoute path='/' exact component={Dashboard} />
            <PrivateRoute path='/profile' exact component={Profile} />
            <ChessProvider>
              <PrivateSocket path='/play-online' component={PlayOnline} />
              <PrivateRoute path='/play-local' component={PlayLocal} />
              <PrivateRoute path='/analysis' component={Analysis} />
            </ChessProvider>
          </UserProvider>
        </Switch>
      </Router>
    </>
  )
}
