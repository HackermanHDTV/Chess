import React, { useContext, useReducer } from 'react'
import legalMoves from '../chess/moves/pieceMoves/legalMoves'
import notation from '../chess/moves/util/notation'
import parseFen from '../chess/parseFen'
import newPosition from '../chess/newPosition'
import createFen from '../chess/moves/util/createFen'
import isMate from '../chess/moves/isMate'
import moveNotation from '../chess/moves/moveNotation'

const ChessContext = React.createContext()

const DEFAULT_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export function useChess() {
  return useContext(ChessContext)
}

const INITIAL_LOCAL_STATE = {
  ...parseFen(DEFAULT_FEN),
  legalMoveElements: [],
  highlightedElements: [],
  legalMoveObjects: [],
  selectedElement: null,
  moveList: [],
  displayedFEN: DEFAULT_FEN,
  isLocal: true,
  whiteTime: 600,
  blackTime: 600,
  FEN: DEFAULT_FEN,
}

const INITIAL_ONLINE_STATE = {
  ...parseFen(DEFAULT_FEN),
  legalMoveElements: [],
  highlightedElements: [],
  legalMoveObjects: [],
  selectedElement: null,
  isOnline: true,
  moveList: [],
  displayedFEN: DEFAULT_FEN,
  FEN: DEFAULT_FEN,
  played: false,
  latestMoveObj: null,
}
const INITIAL_ANALYSIS_STATE = {
  ...parseFen(DEFAULT_FEN),
  legalMoveElements: [],
  highlightedElements: [],
  legalMoveObjects: [],
  selectedElement: null,
  displayedFEN: DEFAULT_FEN,
  moveList: [],
  isAnalysis: true,
  FEN: DEFAULT_FEN,
}

export function ChessProvider({ children }) {
  function reducer(state, action) {
    switch (action.type) {
      case 'init': {
        if (action.payload.type === 'local') {
          return { ...INITIAL_LOCAL_STATE }
        }
        if (action.payload.type === 'online') {
          return {
            ...INITIAL_ONLINE_STATE,
            onlineColor: action.payload.onlineColor,
            emitMove: action.payload.emitMove,
          }
        }
        if (action.payload.type === 'analysis') {
          return { ...INITIAL_ANALYSIS_STATE } //analysis state
        }
        return state
      }
      case 'select': {
        if (action.payload.isBranch) {
          const values = parseFen(state.displayedFEN)
          const getLegalMoves = legalMoves(
            values.position,
            values.toMove,
            values.castlingRights,
            values.enPassantSquare,
            notation(action.payload.element.j, action.payload.element.i)
          )
          return {
            ...state,
            selectedElement: action.payload.element,
            legalMoveObjects: getLegalMoves,
            legalMoveElements: getLegalMoves.map((moveObj) => {
              return moveObj.move[1]
            }),
            highlightedElements: [],
            FEN: state.displayedFEN,
            position: values.position,
            castlingRights: values.castlingRights,
            enPassantSquare: values.enPassantSquare,
            toMove: values.toMove,
            fiftyMoveCount: values.fiftyMoveCount,
            moveCount: values.moveCount,
            moveList:
              state.displayedFEN === DEFAULT_FEN
                ? []
                : state.moveList.slice(
                    0,
                    state.moveList.findIndex(
                      (move) => move.FEN === state.displayedFEN
                    ) + 1
                  ),
          }
        } else {
          const getLegalMoves = legalMoves(
            state.position,
            state.toMove,
            state.castlingRights,
            state.enPassantSquare,
            notation(action.payload.element.j, action.payload.element.i)
          )
          return {
            ...state,
            selectedElement: action.payload.element,
            legalMoveObjects: getLegalMoves,
            legalMoveElements: getLegalMoves.map((moveObj) => {
              return moveObj.move[1]
            }),
            highlightedElements: [],
          }
        }
      }
      case 'deselect': {
        return {
          ...state,
          legalMoveElements: [],
          legalMoveObjects: [],
          highlightedElements: [],
          selectedElement: null,
        }
      }
      case 'highlight': {
        return {
          ...state,
          highlightedElements: [
            ...state.highlightedElements,
            action.payload.id,
          ],
        }
      }
      case 'unhighlight': {
        return {
          ...state,
          highlightedElements: state.highlightedElements.filter(
            (element) => element !== action.payload.id
          ),
        }
      }
      case 'show-previous': {
        const currentIdx = state.moveList.findIndex(
          (move) => move.FEN === state.displayedFEN
        )
        if (currentIdx > 0) {
          return {
            ...state,
            displayedFEN: state.moveList[currentIdx - 1].FEN,
          }
        } else if (currentIdx === 0) {
          return {
            ...state,
            displayedFEN: DEFAULT_FEN,
          }
        } else {
          return state
        }
      }
      case 'show-next': {
        const currentIdx = state.moveList.findIndex(
          (move) => move.FEN === state.displayedFEN
        )
        if (currentIdx !== -1 && currentIdx < state.moveList.length - 1) {
          return {
            ...state,
            displayedFEN: state.moveList[currentIdx + 1].FEN,
          }
        } else if (state.displayedFEN === DEFAULT_FEN) {
          return {
            ...state,
            displayedFEN: state.moveList[0].FEN,
          }
        } else {
          return state
        }
      }
      case 'move': {
        const resultingPosition = newPosition(
          action.payload.moveObj,
          state.position
        )
        const nextMove = state.toMove === 'w' ? 'b' : 'w'
        const newMoveCount =
          state.toMove === 'w' ? state.moveCount + 1 : state.moveCount
        const newFifty =
          !action.payload.moveObj.isCapture &&
          !action.payload.moveObj.isPawnMove
            ? state.fiftyMoveCount + 1
            : state.fiftyMoveCount
        const newEnPassantSquare =
          action.payload.moveObj.newEnPassantSquare || '-'
        const newCastlingRights =
          action.payload.moveObj.castlingRights || state.castlingRights
        const newFEN = createFen({
          position: resultingPosition,
          toMove: nextMove,
          moveCount: newMoveCount,
          fiftyMoveCount: newFifty,
          enPassantSquare: newEnPassantSquare,
          castlingRights: newCastlingRights,
        })

        return {
          ...state,
          FEN: newFEN,
          position: resultingPosition,
          highlightedElements: [],
          legalMoveElements: [],
          legalMoveObjects: [],
          selectedElement: null,
          castlingRights: newCastlingRights,
          enPassantSquare: newEnPassantSquare,
          moveCount: newMoveCount,
          toMove: nextMove,
          fiftyMoveCount: newFifty,
          moveList: [
            ...state.moveList,
            { move: moveNotation(action.payload.moveObj), FEN: newFEN },
          ],
          displayedFEN: newFEN,
          played: true,
          latestMoveObj: action.payload.moveObj,
        }
      }
      case 'receive-move': {
        console.log('reducer recieve move')
        const resultingPosition = newPosition(
          action.payload.moveObj,
          state.position
        )
        const nextMove = state.toMove === 'w' ? 'b' : 'w'
        const newMoveCount =
          state.toMove === 'w' ? state.moveCount + 1 : state.moveCount
        const newFifty =
          !action.payload.moveObj.isCapture &&
          !action.payload.moveObj.isPawnMove
            ? state.fiftyMoveCount + 1
            : state.fiftyMoveCount
        const newEnPassantSquare =
          action.payload.moveObj.newEnPassantSquare || '-'
        const newCastlingRights =
          action.payload.moveObj.castlingRights || state.castlingRights
        const newFEN = createFen({
          position: resultingPosition,
          toMove: nextMove,
          moveCount: newMoveCount,
          fiftyMoveCount: newFifty,
          enPassantSquare: newEnPassantSquare,
          castlingRights: newCastlingRights,
        })
        return {
          ...state,
          FEN: newFEN,
          position: resultingPosition,
          highlightedElements: [],
          legalMoveElements: [],
          legalMoveObjects: [],
          selectedElement: null,
          castlingRights: newCastlingRights,
          enPassantSquare: newEnPassantSquare,
          moveCount: newMoveCount,
          toMove: nextMove,
          fiftyMoveCount: newFifty,
          moveList: [
            ...state.moveList,
            { move: moveNotation(action.payload.moveObj), FEN: newFEN },
          ],
          displayedFEN: newFEN,
        }
      }
      case 'emitted': {
        return { ...state, played: false }
      }
      case 'reset': {
        if (state.isLocal) {
          return { ...INITIAL_LOCAL_STATE }
        }
        if (state.isOnline) {
          return { ...INITIAL_ONLINE_STATE }
        }
        if (state.isAnalysis) {
          return { ...INITIAL_ANALYSIS_STATE }
        }

        return state
      }
      default: {
        console.log('reducer default state')
        console.log(action)
        return state
      }
    }
  }
  const [state, dispatch] = useReducer(reducer, {})

  const value = {
    state,
    dispatch,
  }
  return <ChessContext.Provider value={value}>{children}</ChessContext.Provider>
}
