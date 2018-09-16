let levelCompleted = false
let stackArchivePosition = 0
let stackArchiveNextPosition = 1
let score = 0

let hintTimeOut
const hintDefaultTimer = 1000

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

function getScore(letter) {
  score += alphabet[letter].points * level
  let scoreEle = document.getElementById('score')
  scoreEle.innerHTML = score
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
      setTimeout(showHint, hintDefaultTimer * level)
    }
  }
}

function clearHint() {
  let elt = document.getElementById('morse')
  elt.innerHTML = ''
}

function keyTyped() {
  inputKey = document.getElementById('input_box').value.split('')[
    document.getElementById('input_box').value.length - 1
  ]

  hintTimeOut && clearTimeout(hintTimeOut)
  hintTimeOut = setTimeout(showHint, hintDefaultTimer * level)
  let next = stackArchive[stackArchiveNextPosition]
  if (inputKey && !levelCompleted) {
    if (inputKey.toLowerCase() === next.letter.toLowerCase()) {
      clearHint()
      getScore(next.letter.toLowerCase())
      current = stackArchive[stackArchiveNextPosition]
      stackArchivePosition = stackArchiveNextPosition
      stackArchiveNextPosition = getNextLetterPosition(
        stackArchive,
        stackArchivePosition
      )
      if (levelCompleted) {
        setTimeout(finished, 5000)
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
