export const titleize = (string) => {
  const words = string.split(/(\s|-|\/)/)
  return words.map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join("")
}
