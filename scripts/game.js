let levelCompleted = false
let stackArchivePosition = 0
let stackArchiveNextPosition = 1
let hintTimeOut

const getNextLetterPosition = (stackArchive, stackArchivePosition) => {
  while (true) {
    stackArchivePosition += 1
    if (
      stackArchive[stackArchivePosition] === undefined ||
      stackArchive[stackArchivePosition].letter === undefined
    ) {
      console.log('yay!!')
      hintTimeOut && clearTimeout(hintTimeOut)
      levelCompleted = true
      return stackArchivePosition
    } else if (stackArchive[stackArchivePosition].letter !== -1) {
      return stackArchivePosition
    }
  }
}
// currently a dummy function to display hints until we can get information from the next tile again
function showHint() {
  let elt = document.getElementById('morse')
  if (current.letter) {
    elt.innerHTML = ''
    let letter = current.letter
    elt.innerHTML = letter
    elt.innerHTML += englishToMorse[letter.toLowerCase()]
  }
}

function keyTyped() {
  hintTimeOut && clearTimeout(hintTimeOut)
  hintTimeOut = setTimeout(showHint, 5000)
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
    } else {
      console.log('type -->', stackArchive[stackArchiveNextPosition].letter)
    }
  }
}
