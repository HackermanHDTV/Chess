import notation from '../util/notation'
import idToCoordinates from '../util/idToCoordinates'
import canOccupy from '../util/canOccupy'
import canCapture from '../util/canCapture'

export default function knightMoves(element, position) {
  function exists(file, rank) {
    if (file >= 0 && file <= 7 && rank >= 0 && rank <= 7) {
      return true
    }
    return false
  }

  function findColor(file, rank) {
    let piece = findElement(file, rank)
    if (piece === piece.toLowerCase()) {
      return 'b'
    }
    if (piece === piece.toUpperCase()) {
      return 'w'
    }
  }
  function findElement(file, rank) {
    return position[rank][file]
  }

  let [file, rank] = idToCoordinates(element)
  let legalMoves = []

  let moves = [
    [2, 1],
    [2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ]

  for (let i = 0; i < 8; i++) {
    let f = file + moves[i][0]
    let r = rank + moves[i][1]
    if (!exists(f, r)) {
      continue
    }
    if (canOccupy(f, r, position)) {
      legalMoves.push({
        move: [element, notation(f, r)],
        isCapture: false,
        isCastle: false,
        isEnPassant: false,
        piece: findColor(file, rank) === 'w' ? 'N' : 'n',
      })
    }
    if (canCapture(f, r, findColor(file, rank), position)) {
      legalMoves.push({
        move: [element, notation(f, r)],
        isCapture: true,
        isCastle: false,
        isEnPassant: false,
        piece: findColor(file, rank) === 'w' ? 'N' : 'n',
      })
    }
  }

  return legalMoves
}
