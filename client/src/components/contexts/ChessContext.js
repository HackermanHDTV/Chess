import React, { useState, useEffect, useContext } from 'react'
import legalMoves from '../chess/moves/pieceMoves/legalMoves'
import notation from '../chess/moves/util/notation'
import parseFen, { parseFENPosition } from '../chess/parseFen'
import newPosition from '../chess/newPosition'
import createFen from '../chess/moves/util/createFen'
import isMate from '../chess/moves/isMate'
import moveNotation from '../chess/moves/moveNotation'

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
  const [legalMoveObjects, setLegalMoveObjects] = useState([])

  const [position, setPosition] = useState(parseFENPosition(FEN))
  const [toMove, setToMove] = useState('w')
  const [castlingRights, setCastlingRights] = useState('KQkq')
  const [enPassantSquare, setEnPassantSquare] = useState('-')
  const [moveCount, setMoveCount] = useState(0)
  const [fiftyMoveCount, setFiftyMoveCount] = useState(0)

  const [moveList, setMoveList] = useState([])

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

  function move(moveObj) {
    const resultingPosition = newPosition(moveObj, position)
    if (toMove === 'w') {
      setMoveCount((c) => c + 1)
    }
    if (!moveObj.isCapture && !moveObj.isPawnMove) {
      setFiftyMoveCount((f) => f + 1)
    }
    setPosition(resultingPosition)
    setCastlingRights(moveObj.castlingRights || castlingRights)
    setEnPassantSquare(moveObj.newEnPassantSquare || '-')
    setToMove(toMove === 'w' ? 'b' : 'w')

    setMoveList([...moveList, moveNotation(moveObj)])

    deselectAll()
  }

  useEffect(() => {
    setFEN(
      createFen({
        position,
        toMove,
        moveCount,
        fiftyMoveCount,
        enPassantSquare,
        castlingRights,
      })
    )
  }, [toMove])

  useEffect(() => {
    if (isMate(FEN) === 'Checkmate') {
      alert(`${toMove === 'w' ? 'Black' : 'White'} won by Checkmate`)
    } else if (isMate(FEN) === 'Stalemate') {
      alert('Draw by stalemate')
    }
  }, [FEN])

  useEffect(() => {
    if (!selectedElement) {
      return
    }

    const getLegalMoves = legalMoves(
      position,
      toMove,
      castlingRights,
      enPassantSquare,
      notation(selectedElement.j, selectedElement.i)
    )
    setLegalMoveObjects(getLegalMoves)
    setLegalMoveElements(
      getLegalMoves.map((moveObj) => {
        return moveObj.move[1]
      })
    )
    setHighlightedElements([])
  }, [selectedElement])

  const value = {
    FEN,
    setFEN,
    selectedElement,
    setSelectedElement,
    setLegalMoveElements,
    legalMoveElements,
    position,
    highlightElement,
    highlightedElements,
    unHighlightElement,
    toMove,
    deselectAll,
    legalMoveObjects,
    move,
    moveList,
  }
  return <ChessContext.Provider value={value}>{children}</ChessContext.Provider>
}
