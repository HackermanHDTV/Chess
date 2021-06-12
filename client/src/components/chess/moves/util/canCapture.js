export default function canCapture(file, rank, color, position) {
  function findColor(file, rank) {
    let piece = findElement(file, rank)
    if (piece === piece.toLowerCase()) {
      return 'b'
    }
    if (piece === piece.toUpperCase()) {
      return 'w'
    }
  }

  function isEmpty(file, rank) {
    return findElement(file, rank) === ''
  }

  function isOppositeColor(file, rank, color) {
    return findColor(file, rank) !== color
  }

  function findElement(file, rank) {
    return position[rank][file]
  }
  if (!isEmpty(file, rank) && isOppositeColor(file, rank, color)) {
    return true
  }

  return false
}
