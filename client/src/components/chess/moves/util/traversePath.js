import canOccupy from './canOccupy'
import canCapture from './canCapture'
import notation from './notation'

function exists(file, rank) {
  if (file >= 0 && file <= 7 && rank >= 0 && rank <= 7) {
    return true
  }
  return false
}

export default function traversePath(
  file,
  rank,
  fileChange,
  rankChange,
  color,
  position
) {
  function findElement(file, rank) {
    return position[rank][file]
  }
  let f = file + fileChange
  let r = rank + rankChange

  let successfulMoves = []

  while (true) {
    if (!exists(f, r)) {
      break
    }
    if (canOccupy(f, r, position)) {
      successfulMoves.push({
        move: [notation(file, rank), notation(f, r)],
        isCapture: false,
        isEnPassant: false,
        isCastle: false,
        piece: findElement(file, rank),
      })
    } else if (canCapture(f, r, color, position)) {
      successfulMoves.push({
        move: [notation(file, rank), notation(f, r)],
        isCapture: true,
        isEnPassant: false,
        isCastle: false,
        piece: findElement(file, rank),
      })
      break
    } else {
      break
    }

    f += fileChange
    r += rankChange
  }

  return successfulMoves
}
