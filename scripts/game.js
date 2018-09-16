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
    if (typeof(letter) === 'string') {
      elt.innerHTML = letter
      elt.innerHTML += englishToMorse[letter.toLowerCase()]
    } else {
      clearTimeout(hintTimeOut)
      setTimeout(showHint, 5000)
    }
  }
}

function clearHint() {
  let elt = document.getElementById('morse')
  elt.innerHTML = ''
}

function keyTyped() {
  hintTimeOut && clearTimeout(hintTimeOut)
  hintTimeOut = setTimeout(showHint, 5000)
  let next = stackArchive[stackArchiveNextPosition]
  if (key && !levelCompleted) {
    if (
      key.toLowerCase() ===
      next.letter.toLowerCase()
    ) {
      clearHint()
      current = stackArchive[stackArchiveNextPosition]
      stackArchivePosition = stackArchiveNextPosition
      stackArchiveNextPosition = getNextLetterPosition(
        stackArchive,
        stackArchivePosition
      )
      if (levelCompleted) {
        setTimeout(finished, 2000)
      }
    } else  {
      next.guessCount += 1
      if (next.guessCount >= 3) {
        showHint()
      }
      console.log('type -->', stackArchive[stackArchiveNextPosition].letter)
    }
  }
}

function finished() {
  createNewGame()
  levelCompleted = false
  stackArchivePosition = 0
  stackArchiveNextPosition = 1
  stackArchive = []
}

