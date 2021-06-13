import React, { useState, useRef } from 'react'
import pieces from './pieces'

import { useChess } from '../../contexts/ChessContext'
import notation from '../moves/util/notation'
import findColor from '../moves/util/findColor'
import idToCoordinates from '../moves/util/idToCoordinates'

export default function Piece({ piece, i, j, boardRef }) {
  const id = notation(j, i)
  const { state, dispatch } = useChess()
  const pieceRef = useRef()

  const toMove = state.displayedFEN.split(' ')[1]

  function handlePieceClick() {
    if (findColor(piece) === toMove) {
      if (state.onlineColor && state.onlineColor !== toMove) {
        console.log('not your move')
        return
      }
      dispatch({
        type: 'select',
        payload: {
          element: { piece, i, j },
          isBranch: state.FEN !== state.displayedFEN,
        },
      })
    } else if (state.legalMoveElements.includes(id)) {
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
    } else {
      dispatch({ type: 'deselect' })
    }
  }

  const [isClicked, setIsClicked] = useState(false)
  const [startLocation, setStartLocation] = useState()

  function translateTarget(id) {
    let [file, rank] = idToCoordinates(id)
    return `translate(${(file * boardRef.current.width) / 8}px,${
      (rank * boardRef.current.width) / 8
    }px)`
  }

  function mouseDown(e) {
    if (findColor(e.target.id) !== toMove) {
      return
    }
    e.target.classList.add('dragging')
    if (state.onlineColor && state.onlineColor !== toMove) {
      console.log('not your move')
      return
    }

    dispatch({
      type: 'select',
      payload: {
        element: { piece, i, j },
        isBranch: state.FEN !== state.displayedFEN,
      },
    })

    setIsClicked(true)
    setStartLocation(id)
  }
  function mouseUp(e) {
    let element = e.target
    element.classList.remove('dragging')
    if (isClicked) {
      setIsClicked(false)
      let targetSquare = document
        .elementsFromPoint(e.clientX, e.clientY)
        .find((element) => element.classList.contains('square'))
      if (targetSquare.classList.contains('legal')) {
        element.style.transform = translateTarget(targetSquare.id)
        setStartLocation(targetSquare.id)
        const moveObj = state.legalMoveObjects.find(
          (moveObj) =>
            moveObj.move[0] ===
              notation(state.selectedElement.j, state.selectedElement.i) &&
            moveObj.move[1] === targetSquare.id
        )
        dispatch({
          type: 'move',
          payload: { moveObj },
        })
      } else {
        const [j, i] = idToCoordinates(startLocation)
        element.style.transform = `translate(${j}00%,${i}00%)`
      }
    }
  }
  function mouseMove(e) {
    let element = e.target
    let board = document.querySelector('.board')
    let boardX = board.offsetLeft
    let boardY = board.offsetTop
    if (isClicked) {
      let mouseX = e.clientX - boardX
      let mouseY = e.clientY - boardY
      let x = mouseX - pieceRef.current.width / 2
      let y = mouseY - pieceRef.current.width / 2
      element.style.transform = `translate(${x}px,${y}px)`
    }
  }

  return (
    <img
      onContextMenu={(e) => {
        e.preventDefault()
        if (state.highlightedElements.includes(id)) {
          dispatch({ type: 'unhighlight', payload: { id } })
        } else {
          dispatch({ type: 'highlight', payload: { id } })
        }
      }}
      id={piece}
      src={`${pieces[piece]}`}
      alt=''
      style={{ transform: `translate(${j}00%,${i}00%)` }}
      onClick={handlePieceClick}
      draggable={false}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      ref={pieceRef}
    />
  )
}
