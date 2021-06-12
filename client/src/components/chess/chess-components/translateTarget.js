import idToCoordinates from './moves/helperFns/idToCoordinates'

const BOARD_WIDTH = 600
const BOARD_HEIGHT = 600

export default function translateTarget(id) {
  // console.log(id)
  let [file, rank] = idToCoordinates(id)
  return `translate(${(file * BOARD_WIDTH) / 8}px,${
    (rank * BOARD_HEIGHT) / 8
  }px)`
}
