import notation from '../util/notation'
import idToCoordinates from '../util/idToCoordinates'
import canOccupy from '../util/canOccupy'
import causesCheck from '../causesCheck'
import canCapture from '../util/canCapture'

export default function kingMoves(element, position, castlingRights) {
  function exists(file, rank) {
    if (file >= 0 && file <= 7 && rank >= 0 && rank <= 7) {
      return true
    }
    return false
  }

  function findColor(file, rank) {
    let piece = findElement(file, rank)
    if (piece === piece.toLowerCase()) {
      return 'b'
    }
    if (piece === piece.toUpperCase()) {
      return 'w'
    }
  }
  function findElement(file, rank) {
    return position[rank][file]
  }

  let [file, rank] = idToCoordinates(element)
  let legalMoves = []

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

  const kingCastle = findColor(file, rank) === 'w' ? 'K' : 'k'
  const queenCastle = findColor(file, rank) === 'w' ? 'Q' : 'q'

  for (let i = 0; i < 8; i++) {
    let f = file + moves[i][0]
    let r = rank + moves[i][1]
    if (!exists(f, r)) {
      continue
    }
    if (canOccupy(f, r, position)) {
      legalMoves.push({
        move: [element, notation(f, r)],
        isCapture: false,
        isCastle: false,
        isEnPassant: false,
        newCastlingRights: castlingRights
          .replace(kingCastle, '')
          .replace(queenCastle, ''),
        piece: kingCastle,
      })
    }
    if (canCapture(f, r, findColor(file, rank), position)) {
      legalMoves.push({
        move: [element, notation(f, r)],
        isCapture: true,
        isCastle: false,
        isEnPassant: false,
        newCastlingRights: castlingRights
          .replace(kingCastle, '')
          .replace(queenCastle, ''),
        piece: kingCastle,
      })
    }
  }

  // Handle castling
  if (findElement(file, rank) === 'K') {
    if (castlingRights.includes('K')) {
      //add king side castle move to list
      if (
        canOccupy(5, 7, position) &&
        !causesCheck({ move: ['e1', 'f1'] }, 'w', position) &&
        canOccupy(6, 7, position) &&
        !causesCheck({ move: ['e1', 'g1'] }, 'w', position)
      ) {
        legalMoves.push({
          move: ['e1', 'g1'],
          isCastle: true,
          castleType: 'O-O',
          castleColor: 'w',
          newCastlingRights: castlingRights.replace('K', '').replace('Q', ''),
        })
      }
    }
    if (castlingRights.includes('Q')) {
      //add queen side castle move to list
      if (
        canOccupy(3, 7, position) &&
        !causesCheck({ move: ['e1', 'd1'] }, 'w', position) &&
        canOccupy(2, 7, position) &&
        !causesCheck({ move: ['e1', 'c1'] }, 'w', position)
      ) {
        legalMoves.push({
          move: ['e1', 'c1'],
          isCastle: true,
          castleType: 'O-O-O',
          castleColor: 'w',
          newCastlingRights: castlingRights.replace('K', '').replace('Q', ''),
        })
      }
    }
  }
  if (findElement(file, rank) === 'k') {
    if (castlingRights.includes('k')) {
      //add king side castle move to list
      if (
        canOccupy(5, 0, position) &&
        !causesCheck({ move: ['e8', 'f8'] }, 'b', position) &&
        canOccupy(6, 0, position) &&
        !causesCheck({ move: ['e8', 'g8'] }, 'b', position)
      ) {
        legalMoves.push({
          move: ['e8', 'g8'],
          isCastle: true,
          castleType: 'O-O',
          castleColor: 'b',
          newCastlingRights: castlingRights.replace('k', '').replace('q', ''),
        })
      }
    }
    if (castlingRights.includes('q')) {
      //add queen side castle move to list
      if (
        canOccupy(3, 0, position) &&
        !causesCheck({ move: ['e8', 'd8'] }, 'b', position) &&
        canOccupy(2, 0, position) &&
        !causesCheck({ move: ['e8', 'c8'] }, 'b', position)
      ) {
        legalMoves.push({
          move: ['e8', 'c8'],
          isCastle: true,
          castleType: 'O-O-O',
          castleColor: 'b',
          newCastlingRights: castlingRights.replace('k', '').replace('q', ''),
        })
      }
    }
  }

  return legalMoves
}
