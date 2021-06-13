import React, { useEffect, useState } from 'react'
import Board from '../chess-components/Board'
import { useChess } from '../../contexts/ChessContext'
import Details from './Details'
import Loading from '../../Loading'

export default function PlayLocal() {
  const [isLoading, setIsLoading] = useState(true)
  const { dispatch } = useChess()

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
          <Board />
          <Details />
        </>
      )}
    </div>
  )
}
