import React from 'react'
import { ChessProvider } from '../../contexts/ChessContext'
import { SocketProvider } from '../../contexts/SocketContext'
import Board from './Board'
import Details from './Details'

export default function PlayOnline() {
	return (
		<ChessProvider>
			<SocketProvider>
				<Board />
				<Details isAnalysis={false} />
			</SocketProvider>
		</ChessProvider>
	)
}
