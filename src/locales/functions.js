const upperCase = [
  "api",
]

export const titleize = (string) => {
  if (upperCase.includes(string)) {
    return capLocked(string)
  } else {
    const words = string.split(/(\s|-|\/)/)
    return words.map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join("")
  }
}

const capLocked = string => string.toUpperCase()
