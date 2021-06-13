import React, { useEffect, useState } from 'react'
import Board from '../chess-components/Board'
import { useChess } from '../../contexts/ChessContext'
import Details from './Details'
import Loading from '../../Loading'
import Time from './Time'
import isMate from '../moves/isMate'

export default function PlayLocal() {
  const [isLoading, setIsLoading] = useState(true)
  const { dispatch, state } = useChess()

  const [whiteTimer, setWhiteTimer] = useState()
  const [blackTimer, setBlackTimer] = useState()
  const [whiteTime, setWhiteTime] = useState(600)
  const [blackTime, setBlackTime] = useState(600)

  function whiteDecrement() {
    setWhiteTime((t) => t - 1)
  }
  function blackDecrement() {
    setBlackTime((t) => t - 1)
  }

  function moveStart(color) {
    if (color === 'w') {
      const whiteTimerVar = setInterval(whiteDecrement, 1000)
      setWhiteTimer(whiteTimerVar)
    } else {
      const blackTimerVar = setInterval(blackDecrement, 1000)
      setBlackTimer(blackTimerVar)
    }
  }

  function moveStop(color) {
    if (color === 'w') {
      clearInterval(whiteTimer)
    } else {
      clearInterval(blackTimer)
    }
  }

  useEffect(() => {
    if (whiteTime < 0) {
      alert('Black won by timeout')
      setBlackTime(600)
      setWhiteTime(600)
      dispatch({ type: 'reset' })
      return
    } else if (blackTime < 0) {
      alert('Black won by timeout')
      setBlackTime(600)
      setWhiteTime(600)
      dispatch({ type: 'reset' })
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whiteTime, blackTime])

  useEffect(() => {
    if (!state.FEN) {
      return
    }
    if (isMate(state.FEN) === 'Checkmate') {
      alert(`${state.toMove} won by checkmate`)
      dispatch({ type: 'reset' })
    }
    if (isMate(state.FEN) === 'Stalemate') {
      alert(`Draw by stalemate`)
      dispatch({ type: 'reset' })
    }
    moveStart(state.toMove)
    moveStop(state.toMove === 'w' ? 'b' : 'w')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.toMove])

  useEffect(() => {
    dispatch({ type: 'init', payload: { type: 'local' } })
    setIsLoading(false)
  }, [])

  return (
    <div className='local'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='local__board'>
            <div className='black time'>
              <Time time={blackTime} />
            </div>
            <Board />
            <div className='white time'>
              <Time time={whiteTime} />
            </div>
          </div>

          <Details />
        </>
      )}
    </div>
  )
}
