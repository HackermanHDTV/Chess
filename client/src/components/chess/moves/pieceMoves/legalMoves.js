import pawnMoves from './pawnMoves'
import kingMoves from './kingMoves'
import knightMoves from './knightMoves'
import bishopMoves from './bishopMoves'
import rookMoves from './rookMoves'
import queenMoves from './queenMoves'
import idToCoordinates from '../util/idToCoordinates'
import causesCheck from '../causesCheck'

export default function legalMoves(
  position,
  colorToMove,
  castlingRights,
  enPassantSquare,
  rootSquare
) {
  function findElement(file, rank) {
    return position[rank][file]
  }

  function moves(element) {
    let [file, rank] = idToCoordinates(element)
    let piece = findElement(file, rank)
    let moves = []
    switch (piece.toLowerCase()) {
      case 'p':
        moves = pawnMoves(element, position, enPassantSquare)
        break
      case 'r':
        moves = rookMoves(element, position)
        break
      case 'n':
        moves = knightMoves(element, position)
        break
      case 'b':
        moves = bishopMoves(element, position)
        break
      case 'k':
        moves = kingMoves(element, position, castlingRights)
        break
      case 'q':
        moves = queenMoves(element, position)
        break
      default:
        console.log('default case')
    }

    return moves
  }

  let rawMoveList = moves(rootSquare).filter(
    (moveObj) => !causesCheck(moveObj, colorToMove, position)
  )

  return rawMoveList
}
