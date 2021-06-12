export const isSameColor = (piece, isWhite) => piece.isLowerCase() === isWhite
export const onBoard = (i, j) => 0 <= i && i < 8 && 0 <= j && j < 8
export const baseRank = (i, isWhite) => (isWhite ? i === 6 : i === 1)
export const getCoordinates = (notation) => {
  if (notation === '-') return null
  return [8 - parseInt(notation[1]), notation.charCodeAt(0) - 97]
}

export function parseFEN(FEN) {
  var position = FEN.split('/').map((row) => {
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
