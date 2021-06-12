import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from './contexts/UserContext'

import logo from '../assets/logo.jpeg'

export default function Header() {
  const { user, logout } = useUser()
  return (
    <header className='header'>
      <nav className='flex flex-ai-c flex-jc-sb'>
        <Link to='/'>
          <div className='header__logo flex flex-ai-c'>
            <img src={logo} alt='' />
            <div className='text'>Chess</div>
          </div>
        </Link>

        <div className='header__menu hide-for-desktop'>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className='header__links hide-for-mobile flex flex-jc-sb flex-ai-c'>
          <Link to='/play-online'>
            <li>Play Online</li>
          </Link>
          <Link to='/play-local'>
            <li>Pass & Play</li>
          </Link>
          <Link to='/analysis'>
            <li>Analysis Board</li>
          </Link>
          <Link to='/profile'>
            <li>Profile</li>
          </Link>
        </ul>

        {user ? (
          <div
            onClick={() => logout()}
            className='header__button hide-for-mobile'
          >
            Log Out
          </div>
        ) : (
          <div className='header__button hide-for-mobile'>
            <Link to='/login'>Log In</Link>
          </div>
        )}
      </nav>
    </header>
  )
}
