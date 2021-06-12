import legalMoves from './legalMoves'
import isInCheck from './isInCheck'

export default function isMate(FEN) {
  function parseFENPosition(FEN) {
    var position = FEN.split('')
      .reverse()
      .join('')
      .split('/')
      .map((row) => {
        let row2 = []
        for (let i = 0; i < row.length; i++) {
          if (row[i] >= 1 && row[i] <= 8) {
            for (let k = 0; k < parseInt(row[i]); k++) {
              row2.push('')
            }
          } else {
            row2.push(row[i])
          }
        }
        return row2
      })
    return position
  }
  let values = FEN.split(' ')

  let position = parseFENPosition(values[0])
  let toMove = values[1]

  function findColor(piece) {
    if (piece.toLowerCase() === piece) {
      return 'b'
    }
    if (piece.toUpperCase() === piece) {
      return 'w'
    }
  }

  function id(file, rank) {
    let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    return `${files[7 - file]}${rank + 1}`
  }
  let moves = []
  position.forEach((row, idx1) => {
    row.forEach((square, idx2) => {
      if (square !== '' && findColor(square) === toMove) {
        moves = moves.concat(legalMoves(FEN, id(idx2, idx1)))
      }
    })
  })

  if (moves.length === 0) {
    if (isInCheck(toMove, position)) {
      return 'Checkmate'
    } else {
      return 'Stalemate'
    }
  }
  return
}
