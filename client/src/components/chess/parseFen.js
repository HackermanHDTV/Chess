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
  return {
    position: parseFENPosition(fen.split(' ')[0]),
    colorToMove: fen.split(' ')[1],
    castlingRights: fen.split(' ')[2],
    enPassantSquare: fen.split(' ')[3],
    fiftyMoveRuleCount: parseInt(fen.split(' ')[4]),
    moveCount: parseInt(fen.split(' ')[5]),
    moves: [],
    legalMoveElements: [],
    selectedElement: null,
  }
}
