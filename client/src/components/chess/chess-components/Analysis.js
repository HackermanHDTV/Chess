import React, { useEffect, useState } from 'react'
import Board from '../chess-components/Board'
import { useChess } from '../../contexts/ChessContext'
import Details from './Details'
import Loading from '../../Loading'

export default function Analysis() {
  const [isLoading, setIsLoading] = useState(true)
  const { dispatch } = useChess()

  useEffect(() => {
    dispatch({ type: 'init', payload: { type: 'analysis' } })
    setIsLoading(false)
  }, [])

  return (
    <div className='analysis'>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Board />
          <Details isAnalysis={true} />
        </>
      )}
    </div>
  )
}
