export class Move {
  constructor(from, target, isCapture, isCastle = false, enPassant = false) {
    this.from = from
    this.target = target
    this.isCapture = isCapture
    this.isCastle = isCastle
    this.enPassant = enPassant
  }
}
