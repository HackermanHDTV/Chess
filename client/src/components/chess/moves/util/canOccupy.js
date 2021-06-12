export default function canOccupy(file, rank, position) {
  function isEmpty(file, rank) {
    return findElement(file, rank) === ''
  }

  function findElement(file, rank) {
    return position[rank][file]
  }
  if (isEmpty(file, rank, position)) {
    return true
  }

  return false
}
