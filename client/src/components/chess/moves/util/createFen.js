export default function createFen(state) {
  function positionToFen(position) {
    let f = ''
    for (let i = 0; i < 8; i++) {
      let count = 0
      for (let j = 0; j < 8; j++) {
        if (position[i][j] === '') {
          count++
        } else {
          if (count !== 0) {
            f = f.concat(count)
            count = 0
          }
          f = f.concat(position[i][j])
        }
      }
      if (count !== 0) {
        f = f.concat(count)
      }
      if (i !== 7) {
        f = f.concat('/')
      }
    }
    return f
  }

  let fen = `${positionToFen(state.position)} ${state.toMove} ${
    state.castlingRights
  } ${state.enPassantSquare} ${state.fiftyMoveRuleCount} ${state.moveCount}`

  return fen
}
