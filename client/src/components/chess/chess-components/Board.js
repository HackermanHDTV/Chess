import React, { useRef } from 'react'
import Piece from './Piece'
import notation from '../moves/util/notation'

import { useChess } from '../../contexts/ChessContext'

export default function Board() {
  const {
    legalMoveElements,
    position,
    unHighlightElement,
    highlightElement,
    highlightedElements,
    deselectAll,
  } = useChess()

  const boardRef = useRef()

  function handleRightClick(id) {
    if (highlightedElements.includes(id)) {
      unHighlightElement(id)
    } else {
      highlightElement(id)
    }
  }

  function handleClick(id) {
    if (!highlightedElements.includes(id)) {
      deselectAll()
      return
    }

    // Major Fen Change
  }

  return (
    <>
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
            const id = notation(colIdx, rowIdx)
            return (
              <div
                onContextMenu={(e) => {
                  e.preventDefault()
                  handleRightClick(id)
                }}
                onClick={() => handleClick(id)}
                id={id}
                key={rowIdx * 8 + colIdx}
                className={`square ${
                  (rowIdx + colIdx) % 2 ? 'dark' : 'light'
                } ${legalMoveElements.includes(id) ? 'legal' : ''} ${
                  highlightedElements.includes(id) ? 'highlighted' : ''
                }`}
              ></div>
            )
          })
        })}
      </div>
    </>
  )
}
