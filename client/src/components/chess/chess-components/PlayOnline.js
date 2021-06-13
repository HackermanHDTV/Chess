import React from 'react'
import { useChess } from '../../contexts/ChessContext'
import Board from './Board'
import Details from './Details'

export default function PlayOnline() {
  const { state } = useChess()

  return (
    <div className='online'>
      {state.onlineColor && (
        <>
          <Board />
          <Details isAnalysis={false} />
        </>
      )}
    </div>
  )
}
