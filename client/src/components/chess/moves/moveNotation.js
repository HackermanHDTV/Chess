export default function moveNotation(moveObj) {
  if (moveObj.isCastle) {
    return moveObj.castleType
  }
  if (moveObj.isEnPassant) {
    return `${moveObj.move[0]}x${moveObj.enPassantSquare}`
  }
  if (moveObj.isPawnMove) {
    if (moveObj.isCapture) {
      return `${moveObj.move[0].charAt(0)}x${moveObj.move[1]}`
    }
    return moveObj.move[1]
  }
  if (moveObj.isCapture) {
    return `${moveObj.piece}x${moveObj.move[1]}`
  }
  return `${moveObj.piece.toUpperCase()}${moveObj.move[1]}`
}
