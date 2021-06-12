import bishopMoves from './bishopMoves'
import rookMoves from './rookMoves'

export default function queenMoves(element, position) {
  return bishopMoves(element, position).concat(rookMoves(element, position))
}
