import React, { useRef } from 'react'
import Piece from './Piece'

export default function Board({ position }) {
  position = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ]

  const boardRef = useRef()

  return (
    <div className='board' ref={boardRef}>
      {position.map((row, rowIdx) => {
        return row.map((square, colIdx) => {
          if (square) {
            return (
              <Piece
                key={rowIdx * 8 + colIdx}
                piece={square}
                i={rowIdx}
                j={colIdx}
              />
            )
          }
        })
      })}
      {position.map((row, rowIdx) => {
        return row.map((square, colIdx) => {
          return (
            <div
              className={`square ${(rowIdx + colIdx) % 2 ? 'dark' : 'light'}`}
            ></div>
          )
        })
      })}
    </div>
  )
}
