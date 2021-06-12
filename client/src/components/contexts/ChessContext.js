import React, { useState, useEffect, useContext } from 'react'
import legalMoves from '../chess/moves/pieceMoves/legalMoves'
import notation from '../chess/moves/util/notation'
import parseFen, { parseFENPosition } from '../chess/parseFen'
import newPosition from '../chess/newPosition'
import createFen from '../chess/moves/util/createFen'
import isMate from '../chess/moves/isMate'
import moveNotation from '../chess/moves/moveNotation'

const ChessContext = React.createContext()

const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export function useChess() {
  return useContext(ChessContext)
}

export function ChessProvider({ children }) {
  const [FEN, setFEN] = useState(DEFAULT_FEN)
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

  const [displayedFEN, setDisplayedFEN] = useState(FEN)
  const [lastMove, setLastMove] = useState()

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

    setLastMove(moveNotation(moveObj))

    deselectAll()
  }

  function showPreviousMove(currentlyDisplayedFEN) {
    const currentIdx = moveList.findIndex(
      (move) => move.FEN === currentlyDisplayedFEN
    )

    if (currentIdx > 0) {
      setDisplayedFEN(moveList[currentIdx - 1].FEN)
    }
    if (currentIdx === 0) {
      setDisplayedFEN(DEFAULT_FEN)
    }
  }
  function showNextMove(currentlyDisplayedFEN) {
    const currentIdx = moveList.findIndex(
      (move) => move.FEN === currentlyDisplayedFEN
    )
    if (currentIdx !== -1 && currentIdx < moveList.length - 1) {
      setDisplayedFEN(moveList[currentIdx + 1].FEN)
    }
    if (currentlyDisplayedFEN === DEFAULT_FEN) {
      setDisplayedFEN(moveList[0].FEN)
    }
  }

  function resetDisplayedBoard() {
    setDisplayedFEN(FEN)
  }

  function selectElement(selectObj, isBranch) {
    setSelectedElement(selectObj)

    if (isBranch) {
      setFEN(displayedFEN)
      const {
        position,
        toMove,
        castlingRights,
        enPassantSquare,
        moveCount,
        fiftyMoveCount,
      } = parseFen(displayedFEN)
      setPosition(position)
      setCastlingRights(castlingRights)
      setEnPassantSquare(enPassantSquare)
      setToMove(toMove)
      setFiftyMoveCount(fiftyMoveCount)
      setMoveCount(moveCount)
      const getLegalMoves = legalMoves(
        position,
        toMove,
        castlingRights,
        enPassantSquare,
        notation(selectObj.j, selectObj.i)
      )
      setLegalMoveObjects(getLegalMoves)
      setLegalMoveElements(
        getLegalMoves.map((moveObj) => {
          return moveObj.move[1]
        })
      )

      if (displayedFEN === DEFAULT_FEN) {
        setMoveList([])
      } else {
        setMoveList(
          moveList.slice(
            0,
            moveList.findIndex((move) => move.FEN === displayedFEN)
          )
        )
      }
    } else {
      const getLegalMoves = legalMoves(
        position,
        toMove,
        castlingRights,
        enPassantSquare,
        notation(selectObj.j, selectObj.i)
      )
      setLegalMoveObjects(getLegalMoves)
      setLegalMoveElements(
        getLegalMoves.map((moveObj) => {
          return moveObj.move[1]
        })
      )
    }

    setHighlightedElements([])
  }

  useEffect(() => {
    const newFEN = createFen({
      position,
      toMove,
      moveCount,
      fiftyMoveCount,
      enPassantSquare,
      castlingRights,
    })
    if (lastMove) {
      setMoveList([...moveList, { move: lastMove, FEN: newFEN }])
    }
    setFEN(newFEN)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toMove])

  useEffect(() => {
    setDisplayedFEN(FEN)
    if (isMate(FEN) === 'Checkmate') {
      alert(`${toMove === 'w' ? 'Black' : 'White'} won by Checkmate`)
    } else if (isMate(FEN) === 'Stalemate') {
      alert('Draw by stalemate')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FEN])

  const value = {
    displayedFEN,
    selectedElement,
    selectElement,
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
    showPreviousMove,
    showNextMove,
    resetDisplayedBoard,
    FEN,
  }
  return <ChessContext.Provider value={value}>{children}</ChessContext.Provider>
}
