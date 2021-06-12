import idToCoordinates from './moves/util/idToCoordinates'

export default function newPosition(moveObj, position) {
  let move = moveObj.move
  let newPosition = []
  for (let i = 0; i < 8; i++) {
    newPosition.push([])
    for (let j = 0; j < 8; j++) {
      newPosition[i].push(position[i][j])
    }
  }

  let [targetFile, targetRank] = idToCoordinates(move[1])
  let [file, rank] = idToCoordinates(move[0])

  if (moveObj.isEnPassant) {
    let [enpfile, enprank] = idToCoordinates(moveObj.enPassantCapture)
    newPosition[targetRank][targetFile] = position[rank][file]
    newPosition[rank][file] = ''
    newPosition[enprank][enpfile] = ''
  } else if (moveObj.isCastle) {
    if (moveObj.castleType === 'O-O') {
      if (moveObj.castleColor === 'w') {
        newPosition[7][5] = 'R'
        newPosition[7][7] = ''
      }
      if (moveObj.castleColor === 'b') {
        newPosition[0][5] = 'r'
        newPosition[0][7] = ''
      }
    }
    if (moveObj.castleType === 'O-O-O') {
      if (moveObj.castleColor === 'w') {
        newPosition[7][3] = 'R'
        newPosition[7][0] = ''
      }
      if (moveObj.castleColor === 'b') {
        newPosition[0][3] = 'r'
        newPosition[0][0] = ''
      }
    }
    newPosition[targetRank][targetFile] = position[rank][file]
    newPosition[rank][file] = ''
  } else {
    newPosition[targetRank][targetFile] = position[rank][file]
    newPosition[rank][file] = ''
  }
  return newPosition
}
