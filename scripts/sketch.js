// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Videos
// https://youtu.be/HyK_Q5rrcr4
// https://youtu.be/D8UgRyRnvXU
// https://youtu.be/8Ju_uxJ9v44
// https://youtu.be/_p5IH0L63wo

// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

const numberOfRows = 5
const canvasSize = 280 // in pixels
const w = Math.floor(canvasSize / numberOfRows) - canvasSize / 100 // cell size

let cols, rows
let current
let grid
let stack = []
let stackArchive = []
let level = 0
let letters

let fr

function setup() {
  let canvas = createCanvas(canvasSize, canvasSize)
  canvas.parent('canvas_container')
  cols = floor(width / w)
  rows = floor(height / w)

  createNewGame()
}

function updateInstructions() {
  if (current.letter != -1) {
    // the main instructions div
    let mostBox = document.getElementById('morse')

    // cleaning...
    mostBox.innerHTML = ''

    if (levelCompleted) {
      let morseText = document.getElementById('morse_text')
        ? document.getElementById('morse_text')
        : mostBox.appendChild(
            document.createElement('morse_text'),
            document.getElementById('morse_text')
          )
      let morseLetter = '🎉'
      let parag = document.createElement('p')
      parag.id = 'letter'
      parag.innerHTML = morseLetter
      let space = document.createElement('p')
      space.innerHTML = ' '
      morseText.appendChild(space)
      morseText.appendChild(parag)
      return
    }

    // adding call to action
    let callToAction = document.getElementById('call_to_action')
      ? document.getElementById('call_to_action')
      : mostBox.appendChild(
          document.createElement('call_to_action'),
          document.getElementById('call_to_action')
        )
    callToAction.innerHTML = ''
    callToAction.innerHTML = 'Help Mr. Lost find his ' + levels[level].itemName
    callToAction.appendChild(document.createElement('br'))

    // adding letter instructions
    let morseText = document.getElementById('morse_text')
      ? document.getElementById('morse_text')
      : mostBox.appendChild(
          document.createElement('morse_text'),
          document.getElementById('morse_text')
        )

    let span = document.createElement('span')
    span.id = 'type'
    span.innerHTML = 'Morse the letter'
    morseText.appendChild(span)
    morseText.appendChild(document.createElement('br'))

    let morseLetter = current.letter
    let parag = document.createElement('p')
    parag.id = 'letter'
    parag.innerHTML = morseLetter
    morseText.appendChild(parag)
  }
}

function createNewGame() {
  fr = 60
  grid = []
  level += 1
  if (level <= Object.keys(levels).length) {
    for (var j = 0; j < rows; j++) {
      for (var i = 0; i < cols; i++) {
        var cell = new Cell(i, j)
        grid.push(cell)
      }
    }
    current = grid[0]
    hintTimeOut && clearTimeout(hintTimeOut)
    hintTimeOut = setTimeout(showHint, 5000)
  } else {
    //Game Completed
  }
}

function draw() {
  frameRate(fr)
  background(255)
  for (var i = 0; i < grid.length; i++) {
    grid[i].show()
  }

  current.visited = true
  current.highlight()

  // STEP 1
  var next = current.checkNeighbors()

  if (next) {
    next.visited = true

    // STEP 2
    stack.push(current)

    // STEP 3
    removeWalls(current, next)

    // STEP 4
    current = next
  } else if (stack.length > 0) {
    stackArchive =
      stackArchive.length <= stack.length ? stack.slice() : stackArchive
    current = stack.pop()
  } else {
    letters = levels[level].words
    highlightPath(stackArchive, letters)
    if (stackArchive.indexOf(current) !== stackArchiveNextPosition) {
      fr = 8
      if (stackArchive[stackArchive.indexOf(current)]) {
        stackArchive[stackArchive.indexOf(current)].solved = true
        current = stackArchive[stackArchive.indexOf(current) + 1]
          ? stackArchive[stackArchive.indexOf(current) + 1]
          : current
        updateInstructions()
      }
    }
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1
  }
  return i + j * cols
}

function removeWalls(a, b) {
  var x = a.i - b.i
  if (x === 1) {
    a.walls[3] = false
    b.walls[1] = false
  } else if (x === -1) {
    a.walls[1] = false
    b.walls[3] = false
  }
  var y = a.j - b.j
  if (y === 1) {
    a.walls[0] = false
    b.walls[2] = false
  } else if (y === -1) {
    a.walls[2] = false
    b.walls[0] = false
  }
}

const highlightPath = (highlightStack, letters) => {
  const interval = Math.floor(highlightStack.length / letters.length)
  let count = 0
  highlightStack.forEach(square => {
    const index = grid.indexOf(square)
    if (index > 0) {
      grid[index].path = true
      if (grid[index].letter === -1 && count % interval == 0) {
        grid[index].letter =
          letters[count / interval] && letters[count / interval].toUpperCase()
      }
      count += 1
    }
  })
  !levelCompleted &&
    (stackArchiveNextPosition = getNextLetterPosition(
      stackArchive,
      stackArchivePosition
    ))
}
