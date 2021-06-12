import canOccupy from '../util/canOccupy'
import canCapture from '../util/canCapture'
import notation from '../util/notation'
import idToCoordinates from '../util/idToCoordinates'

export default function pawnMoves(element, position, enPassantSquare) {
  function findElement(file, rank) {
    return position[rank][file]
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
  let [file, rank] = idToCoordinates(element)
  let legalMoves = []
  let color = findColor(file, rank)

  if (color === 'w') {
    if (rank > 0 && canOccupy(file, rank - 1, position)) {
      //Move one square forward
      legalMoves.push({
        move: [element, notation(file, rank - 1)],
        isCapture: false,
        isCastle: false,
        isEnPassant: false,
        piece: 'P',
        isPawnMove: true,
      })

      //Move two squares forward
      if (rank === 6 && canOccupy(file, 4, position)) {
        if (file > 0 && canCapture(file - 1, 4, 'w', position)) {
          legalMoves.push({
            move: [element, notation(file, 4)],
            isCapture: false,
            isCastle: false,
            isEnPassant: false,
            piece: 'P',
            isPawnMove: true,
            newEnPassantSquare: notation(file, 5),
          })
        } else if (file < 7 && canCapture(file + 1, 4, 'w', position)) {
          legalMoves.push({
            move: [element, notation(file, 4)],
            isCapture: false,
            isCastle: false,
            isEnPassant: false,
            piece: 'P',
            isPawnMove: true,
            newEnPassantSquare: notation(file, 5),
          })
        } else {
          legalMoves.push({
            move: [element, notation(file, 4)],
            isCapture: false,
            isCastle: false,
            isEnPassant: false,
            piece: 'P',
            isPawnMove: true,
          })
        }
      }
    }

    //Capture right
    if (
      file < 7 &&
      rank > 0 &&
      canCapture(file + 1, rank - 1, color, position)
    ) {
      legalMoves.push({
        move: [element, notation(file + 1, rank - 1)],
        isCapture: true,
        isCastle: false,
        isEnPassant: false,
        piece: 'P',
        isPawnMove: true,
      })
    }

    //Capture left
    if (
      file > 0 &&
      rank > 0 &&
      canCapture(file - 1, rank - 1, color, position)
    ) {
      legalMoves.push({
        move: [element, notation(file - 1, rank - 1)],
        isCapture: true,
        isCastle: false,
        isEnPassant: false,
        piece: 'P',
        isPawnMove: true,
      })
    }
  } else {
    if (rank > 0 && canOccupy(file, rank + 1, position)) {
      //Move one square forward
      legalMoves.push({
        move: [element, notation(file, rank + 1)],
        isCapture: false,
        isCastle: false,
        isEnPassant: false,
        piece: 'p',
        isPawnMove: true,
      })

      //Move two squares forward
      if (rank === 1 && canOccupy(file, 3, position)) {
        if (file > 0 && canCapture(file - 1, 3, 'b', position)) {
          legalMoves.push({
            move: [element, notation(file, 3)],
            isCapture: false,
            isCastle: false,
            isEnPassant: false,
            piece: 'p',
            isPawnMove: true,
            newEnPassantSquare: notation(file, 2),
          })
        } else if (file < 7 && canCapture(file + 1, 3, 'b', position)) {
          legalMoves.push({
            move: [element, notation(file, 3)],
            isCapture: false,
            isCastle: false,
            isEnPassant: false,
            piece: 'p',
            isPawnMove: true,
            newEnPassantSquare: notation(file, 2),
          })
        } else {
          legalMoves.push({
            move: [element, notation(file, 3)],
            isCapture: false,
            isCastle: false,
            isEnPassant: false,
            piece: 'p',
            isPawnMove: true,
          })
        }
      }
    }

    //Capture right
    if (
      file > 0 &&
      rank < 7 &&
      canCapture(file - 1, rank + 1, color, position)
    ) {
      legalMoves.push({
        move: [element, notation(file - 1, rank + 1)],
        isCapture: true,
        isCastle: false,
        isEnPassant: false,
        piece: 'p',
        isPawnMove: true,
      })
    }

    //Capture left
    if (
      file < 7 &&
      rank < 7 &&
      canCapture(file + 1, rank + 1, color, position)
    ) {
      legalMoves.push({
        move: [element, notation(file + 1, rank + 1)],
        isCapture: true,
        isCastle: false,
        isEnPassant: false,
        piece: 'p',
        isPawnMove: true,
      })
    }
  }

  //Handle en-passant
  if (enPassantSquare !== '-') {
    if (Math.abs(file - idToCoordinates(enPassantSquare)[0]) === 1) {
      let square
      if (idToCoordinates(enPassantSquare)[1] === 2) {
        square = notation(idToCoordinates(enPassantSquare)[0], 3)
      }
      if (idToCoordinates(enPassantSquare)[1] === 5) {
        square = notation(idToCoordinates(enPassantSquare)[0], 4)
      }
      legalMoves.push({
        move: [element, enPassantSquare],
        isCastle: false,
        isCapture: true,
        isEnPassant: true,
        enPassantSquare: enPassantSquare,
        enPassantCapture: square,
        piece: color === 'w' ? 'P' : 'p',
        isPawnMove: true,
      })
    }
  }

  return legalMoves
}
