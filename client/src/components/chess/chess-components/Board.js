import React, { useRef } from 'react'
import Piece from './Piece'
import notation from '../moves/util/notation'

import { useChess } from '../../contexts/ChessContext'
import { parseFENPosition } from '../parseFen'

export default function Board() {
  const { dispatch, state } = useChess()

  const position = parseFENPosition(state.displayedFEN)

  const boardRef = useRef()

  function handleRightClick(id) {
    if (state.highlightedElements.includes(id)) {
      dispatch({ type: 'unhighlight', payload: { id } })
    } else {
      dispatch({ type: 'highlight', payload: { id } })
    }
  }

  function handleClick(id) {
    if (!state.legalMoveElements.includes(id)) {
      dispatch({ type: 'deselect' })
      return
    }

    const moveObj = state.legalMoveObjects.find(
      (moveObj) =>
        moveObj.move[0] ===
          notation(state.selectedElement.j, state.selectedElement.i) &&
        moveObj.move[1] === id
    )
    dispatch({
      type: 'move',
      payload: { moveObj },
    })
  }

  return (
    <>
      <div className='board' ref={boardRef}>
        {position.map((row, rowIdx) => {
          // eslint-disable-next-line array-callback-return
          return row.map((square, colIdx) => {
            if (square) {
              return (
                <Piece
                  key={rowIdx * 8 + colIdx}
                  piece={square}
                  i={rowIdx}
                  j={colIdx}
                  boardRef={boardRef}
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
                } ${state.legalMoveElements.includes(id) ? 'legal' : ''} ${
                  state.highlightedElements.includes(id) ? 'highlighted' : ''
                }`}
              ></div>
            )
          })
        })}
      </div>
    </>
  )
}
