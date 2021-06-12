export default function findPosition(element) {
  let elementRect = element.getBoundingClientRect()
  let parentRect = element.parentElement.getBoundingClientRect()
  return [elementRect.top - parentRect.top, elementRect.left - parentRect.left]
}
