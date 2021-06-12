export const kingDirection = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]
export const knightDirection = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
]
export const rookDirection = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
]
export const bishopDirection = [
  [-1, -1],
  [-1, 1],
  [1, -1],
  [1, 1],
]
export const queenDirection = bishopDirection.concat(rookDirection)
