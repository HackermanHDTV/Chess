import React, { useState, useContext, useEffect } from 'react'
import { useChess } from './ChessContext'
import { useUser } from './UserContext'
import Loading from '../Loading'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ children }) {
  const { user } = useUser()
  const { dispatch } = useChess()
  const [socket, setSocket] = useState()
  const [roomID, setRoomID] = useState()
  const [isLoading, setIsLoading] = useState(false)

  function playMove(moveObj) {
    console.log('emitting move to server...')
    socket.emit('move', roomID, moveObj)
  }

  useEffect(() => {
    const newSocket = io('http://192.168.1.9:5000', { query: { id: user._id } })

    setSocket(newSocket)

    newSocket.emit('join-room')
    setIsLoading(true)

    return () => newSocket.close()
  }, [user])

  useEffect(() => {
    if (!socket) {
      return
    }
    socket.on('init', (roomID, color) => {
      setRoomID(roomID)
      dispatch({
        type: 'init',
        payload: { type: 'online', emitMove: playMove, onlineColor: color },
      })
      // dispatch({ type: 'set-online-color', payload: { color } })
    })

    socket.on('begin', () => {
      setIsLoading(false)
    })

    socket.on('make-move', (moveObj) => {
      console.log('socket receive move')
      dispatch({ type: 'receive-move', payload: { moveObj } })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  const value = {
    playMove,
  }

  return (
    <SocketContext.Provider value={value}>
      {isLoading ? <Loading /> : children}
    </SocketContext.Provider>
  )
}
