import React from 'react'
import { useUser } from '../contexts/UserContext'

export default function Profile() {
  const { logout } = useUser()
  return (
    <>
      <button onClick={() => logout()}>Log Out</button>
    </>
  )
}
