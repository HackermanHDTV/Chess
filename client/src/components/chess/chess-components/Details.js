import React from 'react'
import { useChess } from '../../contexts/ChessContext'

export default function Details({ isAnalysis }) {
	const { moveList, showPreviousMove, displayedFEN, showNextMove } = useChess()
	const moves = moveList.map((obj) => obj.move)

	function handleForward() {
		showNextMove(displayedFEN)
	}

	function handleBackward() {
		showPreviousMove(displayedFEN)
	}

	return (
		<>
			<div className='details hide-for-mobile'>
				<span className='top-border'>Moves</span>
				<div className='grid-cont'>
					{moves.map((move, idx) => {
						if (idx % 2 === 0) {
							return (
								<React.Fragment key={idx}>
									<p>{idx / 2 + 1}</p>
									<button className='move btn'>{move}</button>
								</React.Fragment>
							)
						}
						return (
							<button key={idx} className='move btn'>
								{move}
							</button>
						)
					})}
				</div>
				{isAnalysis && (
					<div className='controls flex flex-jc-c'>
						<div
							className='btn forward flex flex-jc-c flex-ai-c'
							onClick={handleBackward}
						>
							<div className='vertical-line'></div>
							<div className='triangle-left'></div>
						</div>
						<div
							className='btn backward flex flex-jc-c flex-ai-c'
							onClick={handleForward}
						>
							<div className='triangle-right'></div>
							<div className='vertical-line'></div>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
