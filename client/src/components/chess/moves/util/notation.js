export default function notation(file, rank) {
  let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  return `${files[file]}${8 - rank}`
}
