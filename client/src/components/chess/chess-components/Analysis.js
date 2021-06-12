import React from 'react'
import Board from '../chess-components/Board'
import { ChessProvider } from '../../contexts/ChessContext'
import Details from './Details'

export default function Analysis() {
  return (
    <ChessProvider>
      <Board />
      <Details />
    </ChessProvider>
  )
}
