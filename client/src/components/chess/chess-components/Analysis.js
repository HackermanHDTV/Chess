import React from 'react'
import Board from '../chess-components/Board'
import { ChessProvider } from '../../contexts/ChessContext'

export default function Analysis() {
  return (
    <ChessProvider>
      <Board />
    </ChessProvider>
  )
}
