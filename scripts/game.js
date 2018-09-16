let levelCompleted = false
let stackArchivePosition = 0
let stackArchiveNextPosition = 1

let hintTimeOut
const hintDefaultTimer = 10000

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
  let elt = document.getElementById('hint')
    ? document.getElementById('hint')
    : document.createElement('div')
  elt.id = 'hint'
  if (current.letter) {
    // elt.innerHTML = ''
    let letter = current.letter
    if (typeof letter === 'string') {
      // elt.innerHTML = letter
      // elt.innerHTML += englishToMorse[letter.toLowerCase()]
      let img = document.createElement('img')
      img.src = alphabet[current.letter.toLowerCase()].imageUrl
      img.id = 'hint_img'
      elt.appendChild(img)

      // adding a small word

      let p = document.createElement('p')
      p.id = 'small_word'

      let smallWordHighlight = document.createElement('span')
      smallWordHighlight.innerHTML =
        alphabet[current.letter.toLowerCase()].imageName[0]
      smallWordHighlight.id = 'small_word_highlight'
      p.appendChild(smallWordHighlight)

      let smallWord = document.createElement('span')
      smallWord.innerHTML = alphabet[
        current.letter.toLowerCase()
      ].imageName.slice(1)

      p.appendChild(smallWord)

      elt.appendChild(p)

      let mostBox = document.getElementById('morse')
      mostBox.appendChild(elt)
    } else {
      clearTimeout(hintTimeOut)
      setTimeout(showHint, hintDefaultTimer * (level + 1))
    }
  }
}

function clearHint() {
  let elt = document.getElementById('morse')
  elt.innerHTML = ''
}

function keyTyped() {
  hintTimeOut && clearTimeout(hintTimeOut)
  hintTimeOut = setTimeout(showHint, hintDefaultTimer * (level + 1))
  let next = stackArchive[stackArchiveNextPosition]
  if (key && !levelCompleted) {
    if (key.toLowerCase() === next.letter.toLowerCase()) {
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
    } else {
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
