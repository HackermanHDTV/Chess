import newPosition from '../newPosition'
import isInCheck from './isInCheck'

export default function causesCheck(moveObj, color, position) {
  return isInCheck(color, newPosition(moveObj, position))
}
