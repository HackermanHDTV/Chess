import React, { useRef } from 'react'
import Piece from './Piece'
import notation from '../moves/util/notation'

import { useChess } from '../../contexts/ChessContext'
import { parseFENPosition } from '../parseFen'
// import { useSocket } from '../../contexts/SocketContext'

export default function Board() {
	const {
		legalMoveElements,
		displayedFEN,
		unHighlightElement,
		highlightElement,
		highlightedElements,
		deselectAll,
		move,
		legalMoveObjects,
		selectedElement,
	} = useChess()

	// const { playMove } = useSocket()

	const position = parseFENPosition(displayedFEN)

	const boardRef = useRef()

	function handleRightClick(id) {
		if (highlightedElements.includes(id)) {
			unHighlightElement(id)
		} else {
			highlightElement(id)
		}
	}

	function handleClick(id) {
		if (!legalMoveElements.includes(id)) {
			deselectAll()
			return
		}

		const moveObj = legalMoveObjects.find(
			(moveObj) =>
				moveObj.move[0] === notation(selectedElement.j, selectedElement.i) &&
				moveObj.move[1] === id
		)
		move(moveObj)
		// playMove(moveObj)
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
									boardRef={boardRef}
								/>
							)
						}
						return <React.Fragment key={100 + rowIdx * colIdx}></React.Fragment>
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
