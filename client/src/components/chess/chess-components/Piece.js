import React from 'react'
import pieces from './pieces'

export default function Piece({ piece, i, j }) {
  return (
    <img
      src={`${pieces[piece]}`}
      alt=''
      style={{ transform: `translate(${j}00%,${i}00%)` }}
    />
  )
}
