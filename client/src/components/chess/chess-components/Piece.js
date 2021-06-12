import React from 'react'
import pieces from './pieces'

import { useChess } from '../../contexts/ChessContext'
import notation from '../moves/util/notation'
import findColor from '../moves/util/findColor'

export default function Piece({ piece, i, j }) {
  const id = notation(j, i)
  const {
    setSelectedElement,
    highlightElement,
    highlightedElements,
    unHighlightElement,
    toMove,
    deselectAll,
  } = useChess()

  function handlePieceClick() {
    if (findColor(piece) === toMove) {
      setSelectedElement({ piece, i, j })
    } else if (highlightedElements.includes(id)) {
      // major FEN Changes
    } else {
      deselectAll()
    }
  }

  return (
    <img
      onContextMenu={(e) => {
        e.preventDefault()
        if (highlightedElements.includes(id)) {
          unHighlightElement(id)
        } else {
          highlightElement(id)
        }
      }}
      src={`${pieces[piece]}`}
      alt=''
      style={{ transform: `translate(${j}00%,${i}00%)` }}
      onClick={handlePieceClick}
      draggable={false}
    />
  )
}
