export default function findColor(piece) {
  if (piece === '') {
    return
  }
  if (piece === piece.toLowerCase()) {
    return 'b'
  } else if (piece === piece.toUpperCase()) {
    return 'w'
  }
}
