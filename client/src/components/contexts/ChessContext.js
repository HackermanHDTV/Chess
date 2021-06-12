import React, { useState, useEffect, useContext } from 'react'
import legalMoves from '../chess/moves/pieceMoves/legalMoves'
import notation from '../chess/moves/util/notation'
import parseFen, { parseFENPosition } from '../chess/parseFen'

const ChessContext = React.createContext()

export function useChess() {
  return useContext(ChessContext)
}

export function ChessProvider({ children }) {
  const [FEN, setFEN] = useState(
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  )
  // const parsedFEN = parseFen(FEN)
  const [selectedElement, setSelectedElement] = useState()
  const [legalMoveElements, setLegalMoveElements] = useState([])
  const [highlightedElements, setHighlightedElements] = useState([])

  const [position, setPosition] = useState(parseFENPosition(FEN))
  const [toMove, setToMove] = useState('w')
  const [castlingRights, setCastlingRights] = useState('KQkq')
  const [enPassantSquare, setEnPassantSquare] = useState('-')
  const [moveCount, setMoveCount] = useState(0)
  const [fiftyMoveCount, setFiftyMoveCount] = useState(0)

  function highlightElement(id) {
    setHighlightedElements([...highlightedElements, id])
  }
  function unHighlightElement(id) {
    setHighlightedElements(
      highlightedElements.filter((element) => element !== id)
    )
  }
  function deselectAll() {
    setHighlightedElements([])
    setSelectedElement(null)
    setLegalMoveElements([])
  }

  useEffect(() => {
    if (!selectedElement) {
      return
    }
    setLegalMoveElements(
      legalMoves(
        position,
        toMove,
        castlingRights,
        enPassantSquare,
        notation(selectedElement.j, selectedElement.i)
      ).map((moveObj) => {
        return moveObj.move[1]
      })
    )
    setHighlightedElements([])
  }, [selectedElement])

  const value = {
    FEN,
    setFEN,
    setSelectedElement,
    setLegalMoveElements,
    legalMoveElements,
    position,
    highlightElement,
    highlightedElements,
    unHighlightElement,
    toMove,
    deselectAll,
  }
  return <ChessContext.Provider value={value}>{children}</ChessContext.Provider>
}
