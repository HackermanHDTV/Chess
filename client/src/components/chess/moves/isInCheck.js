export default function isInCheck(color, position) {
  let search = color === 'w' ? 'K' : 'k'
  let rank = position.findIndex((row) => row.includes(search))
  let file = position[rank]?.indexOf(search)

  //Pawn check
  if (color === 'w') {
    //Capture right
    if (exists(file + 1, rank - 1) && findElement(file + 1, rank - 1) === 'p') {
      return true
    }

    //Capture left
    if (exists(file - 1, rank - 1) && findElement(file - 1, rank - 1) === 'p') {
      return true
    }
  } else {
    //Capture right
    if (exists(file - 1, rank + 1) && findElement(file - 1, rank + 1) === 'P') {
      return true
    }

    //Capture left
    if (exists(file + 1, rank + 1) && findElement(file + 1, rank + 1) === 'P') {
      return true
    }
  }

  let inCheck = false

  //Bishop check
  let pieces = color === 'w' ? ['b', 'q'] : ['B', 'Q']
  let paths = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]

  paths.forEach((path) => {
    if (!clearPath(file, rank, path[0], path[1], pieces)) {
      inCheck = true
      return
    }
  })

  if (!inCheck) {
    //Rook check
    let pieces = color === 'w' ? ['r', 'q'] : ['R', 'Q']
    let paths = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]
    paths.forEach((path) => {
      if (!clearPath(file, rank, path[0], path[1], pieces)) {
        inCheck = true
        return
      }
    })
  }

  if (!inCheck) {
    //Knight Check
    let moves = [
      [2, 1],
      [2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
      [-2, 1],
      [-2, -1],
    ]

    let piece = color === 'w' ? 'n' : 'N'

    for (let i = 0; i < 8; i++) {
      let f = file + moves[i][0]
      let r = rank + moves[i][1]
      if (!exists(f, r)) {
        continue
      }
      if (findElement(f, r) === piece) {
        inCheck = true
        break
      }
    }
  }

  if (!inCheck) {
    //King check
    let moves = [
      [1, 1],
      [0, 1],
      [-1, 1],
      [1, 0],
      [-1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
    ]

    let piece = color === 'w' ? 'k' : 'K'

    for (let i = 0; i < 8; i++) {
      let f = file + moves[i][0]
      let r = rank + moves[i][1]
      if (!exists(f, r)) {
        continue
      }
      if (findElement(f, r) === piece) {
        inCheck = true
        break
      }
    }
  }

  return inCheck

  function findElement(file, rank) {
    return position[rank][file]
  }

  function clearPath(file, rank, fileChange, rankChange, pieces) {
    let f = file + fileChange
    let r = rank + rankChange

    while (true) {
      if (!exists(f, r)) {
        break
      }
      if (pieces.includes(findElement(f, r))) {
        return false
      } else if (findElement(f, r) === '') {
        f += fileChange
        r += rankChange
      } else {
        return true
      }
    }
    return true
  }
}

function exists(file, rank) {
  if (file >= 0 && file <= 7 && rank >= 0 && rank <= 7) {
    return true
  }
  return false
}
