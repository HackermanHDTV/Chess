import formulateMoves from './availableMoves'

let Board
let isWhite
let availableMoves = {}

export default function legalMoves(FEN) {
  availableMoves = formulateMoves(FEN)
  const values = FEN.split(' ')
  Board = parseFen(values[0])
  isWhite = values[1] === 'w'
  for (const coor in availableMoves) {
  }
}
