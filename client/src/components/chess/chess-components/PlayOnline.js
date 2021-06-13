import React, { useEffect } from 'react'
import { useChess } from '../../contexts/ChessContext'
import Board from './Board'
import Details from './Details'
import isMate from '../moves/isMate'
import { useHistory } from 'react-router-dom'

export default function PlayOnline() {
  const { state } = useChess()

  const history = useHistory()

  useEffect(() => {
    if (!state.toMove) {
      return
    }
    if (isMate(state.FEN) === 'Checkmate') {
      alert(`${state.toMove} won by checkmate`)
      history.push('/')
    }
    if (isMate(state.FEN) === 'Stalemate') {
      alert(`Draw by stalemate`)
      history.push('/')
    }
  }, [state.toMove])

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
