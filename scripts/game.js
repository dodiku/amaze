let levelCompleted = false
let stackArchivePosition = 0
let stackArchiveNextPosition = 1

const getNextLetterPosition = (stackArchive, stackArchivePosition) => {
  while (true) {
    stackArchivePosition += 1
    if (
      stackArchive[stackArchivePosition] === undefined ||
      stackArchive[stackArchivePosition].letter === undefined
    ) {
      console.log('yay!!')
      levelCompleted = true
      return stackArchivePosition
    } else if (stackArchive[stackArchivePosition].letter !== -1) {
      return stackArchivePosition
    }
  }
}

function keyTyped() {
  if (key && !levelCompleted) {
    if (
      key.toLowerCase() ===
      stackArchive[stackArchiveNextPosition].letter.toLowerCase()
    ) {
      current = stackArchive[stackArchiveNextPosition]
      stackArchivePosition = stackArchiveNextPosition
      stackArchiveNextPosition = getNextLetterPosition(
        stackArchive,
        stackArchivePosition
      )
      console.log(stackArchiveNextPosition)
    } else {
      console.log('stackArchivePosition -->', stackArchivePosition)
      console.log('type -->', stackArchive[stackArchiveNextPosition].letter)
    }
  }
}
