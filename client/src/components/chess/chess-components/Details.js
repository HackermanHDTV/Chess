import React from 'react'
import { useChess } from '../../contexts/ChessContext'

export default function Details() {
  const { moveList } = useChess()
  return (
    <div>
      {moveList.map((move) => {
        return <div>{move}</div>
      })}
    </div>
  )
}
