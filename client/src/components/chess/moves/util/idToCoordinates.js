export default function idToCoordinates(id) {
  return [id.charCodeAt(0) - 97, 8 - parseInt(id.charAt(1))]
}
