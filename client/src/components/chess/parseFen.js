export function parseFENPosition(FEN) {
  let positionStr = FEN.split(' ')[0]
  let position = positionStr.split('/').map((row) => {
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

export default function parseFen(fen) {
  const values = fen.split(' ')
  return {
    position: parseFENPosition(fen),
    toMove: values[1],
    castlingRights: values[2],
    enPassantSquare: values[3],
    fiftyMoveRuleCount: parseInt(values[4]),
    moveCount: parseInt(values[5]),
    moves: [],
    legalMoveElements: [],
    selectedElement: null,
  }
}
