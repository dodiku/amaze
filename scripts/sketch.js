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

const letters = ['E', 'I']

const numberOfRows = 5
const canvasSize = 280 // in pixels
const w = Math.floor(canvasSize / numberOfRows) - canvasSize / 100 // cell size

let cols, rows
let current
let grid = []
let stack = []
let stackArchive = []
let stackArchivePosition = 1

function setup() {
  let canvas = createCanvas(canvasSize, canvasSize)
  canvas.parent('canvas_container')
  cols = floor(width / w)
  rows = floor(height / w)
  // frameRate(5);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j)
      grid.push(cell)
    }
  }
  current = grid[0]
}

function draw() {
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
    // changing the color of the
    // stackArchive.push(current)
    highlightPath(stackArchive, letters)
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
  grid.forEach(square => {
    if (highlightStack.includes(square) && square.morse === -1) {
      square.morse = letters[Math.floor(Math.random() * letters.length)]
    }
  })
}