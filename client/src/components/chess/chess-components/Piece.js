import React, { useState } from 'react'
import pieces from './pieces'

import { useChess } from '../../contexts/ChessContext'
import notation from '../moves/util/notation'
import findColor from '../moves/util/findColor'
import idToCoordinates from '../moves/util/idToCoordinates'
import { useSocket } from '../../contexts/SocketContext'

export default function Piece({ piece, i, j, boardRef }) {
	const id = notation(j, i)
	const {
		FEN,
		selectElement,
		highlightElement,
		highlightedElements,
		unHighlightElement,
		// toMove,
		deselectAll,
		legalMoveObjects,
		legalMoveElements,
		selectedElement,
		move,
		onlineColor,
		displayedFEN,
	} = useChess()
	const { playMove } = useSocket()

	const toMove = displayedFEN.split(' ')[1]

	function handlePieceClick() {
		if (findColor(piece) === toMove) {
			if (onlineColor && onlineColor !== toMove) {
				return
			}
			selectElement({ piece, i, j }, FEN !== displayedFEN)
		} else if (legalMoveElements.includes(id)) {
			// major FEN Changes
			const moveObj = legalMoveObjects.find(
				(moveObj) =>
					moveObj.move[0] === notation(selectedElement.j, selectedElement.i) &&
					moveObj.move[1] === id
			)
			move(moveObj)
			// playMove(moveObj)
		} else {
			deselectAll()
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
		selectElement({ piece, i, j }, FEN !== displayedFEN)
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
				const moveObj = legalMoveObjects.find(
					(moveObj) =>
						moveObj.move[0] ===
							notation(selectedElement.j, selectedElement.i) &&
						moveObj.move[1] === targetSquare.id
				)
				move(moveObj)
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
			let x = mouseX - 37.5
			let y = mouseY - 37.5
			element.style.transform = `translate(${x}px,${y}px)`
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
			id={piece}
			src={`${pieces[piece]}`}
			alt=''
			style={{ transform: `translate(${j}00%,${i}00%)` }}
			onClick={handlePieceClick}
			draggable={false}
			onMouseDown={mouseDown}
			onMouseUp={mouseUp}
			onMouseMove={mouseMove}
		/>
	)
}
