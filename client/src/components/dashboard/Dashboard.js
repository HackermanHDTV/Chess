import React from 'react'
import Board from '../chess/chess-components/Board'
import { Link } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

export default function Dashboard() {
  const { logout } = useUser()
  return (
    <>
      <Board />
      <button onClick={() => logout()}>Log Out</button>
    </>
  )
}
