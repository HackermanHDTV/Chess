import { Move } from '../Classes/Move'
import { getCoordinates, isSameColor, baseRank, onBoard } from '../util/util'
import {
  knightDirection,
  bishopDirection,
  kingDirection,
  queenDirection,
  rookDirection,
} from './moves'

let Board
let isWhite

export default function formulateMoves(FEN) {
  const values = FEN.split(' ')
  Board = parseFen(values[0])
  isWhite = values[1] === 'w'
  const castlingRights = values[2]
  const enPassantSquare = getCoordinates(values[3])

  let availableMoves = {}

  function getMoves(i, j) {
    switch (Board[i][j].toLowerCase()) {
      case 'r':
        return rookMoves(i, j)
      case 'n':
        return knightMoves(i, j)
      case 'b':
        return bishopMoves(i, j)
      case 'k':
        return kingMoves(i, j, castlingRights)
      case 'q':
        return queenMoves(i, j)
      case 'p':
        return pawnMoves(i, j, enPassantSquare)
    }
  }

  for (let i = 0; i < 8; ++i) {
    for (let j = 0; j < 8; ++j) {
      // Un-Considered pieces
      if (!Board[i][j]) {
        continue
      }
      if (!isSameColor(Board[i][j], isWhite)) {
        continue
      }

      availableMoves[`${i}${j}`] = getMoves(i, j)
    }
  }
}

function formMoves(i, j, moveDirection, netDepth = 8) {
  let netMovesAvailable = []

  for (let d = 0; d < moveDirection.length; ++d) {
    let depth = netDepth
    let nI = i + moveDirection[d][0]
    let nJ = j + moveDirection[d][1]
    while (depth-- && onBoard(nI, nJ)) {
      if (Board[nI][nJ]) {
        if (!isSameColor(Board[nI][nJ], isWhite)) {
          netMovesAvailable.push(new Move([i, j], [nI, nJ], true))
        }
        break
      }
      netMovesAvailable.push(new Move([i, j], [nI, nJ], false))
      nI += movesAvaiable[d][0]
      nJ += movesAvaiable[d][1]
    }
  }

  return netMovesAvaiable
}

function pawnMoves(i, j, enPassantSquare) {
  let movesAvaiable = []
  const moveDirection = isWhite ? -1 : 1

  for (let k = 1; k <= 2; ++k) {
    if (Board[i + k * moveDirection][j]) break
    movesAvaiable.push(
      new Move(
        [i, j],
        [i + k * moveDirection, j],
        false, // isCapture
        false, // isCastle
        baseRank(i, isWhite) && k === 2 // isEnPassantSquare
      )
    )
  }

  for (let k = -1; k <= 1; k += 2) {
    if (
      !isSameColor(Board[i + moveDirection][j + k], isWhite) ||
      (enPassantSquare &&
        i === enPassantSquare[0] &&
        j + k === enPassantSquare[1])
    ) {
      movesAvaiable.push(new Move([i, j], [i + moveDirection, j + k], true))
    }
  }
}

function bishopMoves(i, j) {
  return formMoves(i, j, bishopDirection)
}

function rookMoves(i, j) {
  return formMoves(i, j, rookDirection)
}

function queenMoves(i, j) {
  return formMoves(i, j, queenDirection)
}

function knightMoves(i, j) {
  return formMoves(i, j, knightDirection)
}

function kingMoves(i, j, castlingRights) {
  let kingAvailableMoves = formMoves(i, j, kingDirection)
  const QueenSide = isWhite ? 'Q' : 'q'
  const KingSide = isWhite ? 'k' : 'k'

  // Queen Side
  if (castlingRights.includes(QueenSide)) {
    if (isCastlable(i, j, -1)) {
      kingAvailableMoves.push(new Move([i, j], [i, j - 2], false, true))
    }
  }

  // King Side
  if (castlingRights.includes(KingSide)) {
    if (isCastlable(i, j, 1)) {
      kingAvailableMoves.push(new Move([i, j], [i, j + 2], false, true))
    }
  }

  return kingAvailableMoves
}

function queenMoves(i, j) {
  return formMoves(i, j, queenDirection)
}

function isAttacked(i, j, direction, attackers, netDepth = 1) {
  for (let d = 0; d < direction.length; ++d) {
    let depth = netDepth

    let [nI, nJ] = [i + direction[d][0], j + direction[d][1]]

    while (depth-- && onBoard(nI, nJ)) {
      // empty square -> move forward
      if (!Board[nI][nJ]) {
        nI += direction[d][0]
        nJ += direction[d][1]
        continue
      }

      // if not empty
      // if the square contains a possible attacker
      if (attackers.includes(Board[nI][nJ])) return true

      // else break
      break
    }
  }

  // if line of code reaches here, it implies that the square is safe
  // off the attackers
  return false
}

function isSafeSquare(i, j) {
  let possibleAttacker = ['Q', 'R', 'B', 'N', 'P', 'K']

  if (isWhite) {
    possibleAttacker = possibleAttacker.map((piece) => piece.toLowerCase())
  }

  // isAttacked By King
  if (isAttacked(i, j, kingDirection, [possibleAttacker[5]])) return true

  // isAttacked by Queen or Bishop from diagonals
  if (
    isAttacked(
      i,
      j,
      bishopDirection,
      [possibleAttacker[2], possibleAttacker[0]],
      8
    )
  )
    return true

  // isAttacked by a knight
  if (isAttacked(i, j, knightDirection, [possibleAttacker[3]])) return true

  // isAttacked by Queen or Rook from Rectilinear directions
  if (
    isAttacked(
      i,
      j,
      rookDirection,
      [possibleAttacker[0], possibleAttacker[1]],
      8
    )
  )
    return true

  // isAttacked by a pawn
  const moveDirection = isWhite ? -1 : 1
  if (
    isAttacked(
      i,
      j,
      [
        [moveDirection, -1],
        [moveDirection, 1],
      ],
      [possibleAttacker[4]]
    )
  )
    return true

  // is Safe from all possible attackers
  return false
}

function isCastlable(i, j, direction) {
  let nI = i + direction[0]
  let nJ = j + direction[1]

  const castlableRook = isWhite ? 'R' : 'r'

  while (onBoard(nI, nJ)) {
    if (Board[nI][nJ] === castlableRook) {
      return true
    }

    if (!Board[nI][nJ]) break

    if (!isSafeSquare(nI, nJ)) break

    nI += direction[0]
    nJ += direction[1]
  }

  return false
}
