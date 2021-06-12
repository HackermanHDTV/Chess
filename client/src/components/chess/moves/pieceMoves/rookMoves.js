import idToCoordinates from '../util/idToCoordinates'
import traversePath from '../util/traversePath'

export default function rookMoves(element, position) {
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

  let paths = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]

  paths.forEach((path) => {
    legalMoves = legalMoves.concat(
      traversePath(
        file,
        rank,
        path[0],
        path[1],
        findColor(file, rank),
        position
      )
    )
  })

  return legalMoves
}
