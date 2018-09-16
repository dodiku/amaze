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

function Cell(i, j) {
  this.i = i
  this.j = j
  this.walls = [true, true, true, true] // top , right , bottom , left
  this.visited = false
  this.path = false
  this.letter = -1
  this.solved = false

  this.checkNeighbors = function() {
    var neighbors = []

    var top = grid[index(i, j - 1)]
    var right = grid[index(i + 1, j)]
    var bottom = grid[index(i, j + 1)]
    var left = grid[index(i - 1, j)]

    if (top && !top.visited) {
      neighbors.push(top)
    }
    if (right && !right.visited) {
      neighbors.push(right)
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom)
    }
    if (left && !left.visited) {
      neighbors.push(left)
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length))
      return neighbors[r]
    } else {
      return undefined
    }
  }
  this.highlight = function() {
    var x = this.i * w
    var y = this.j * w
    // noStroke()
    strokeWeight(10)
    fill(0, 0, 255, 100)
    rect(x, y, w, w)
  }

  this.show = function() {
    const padding = 4
    const x = this.i * w + padding
    const y = this.j * w + padding
    stroke(0)
    // top
    if (this.walls[0]) {
      line(x, y, x + w, y)
    }
    // right
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w)
    }
    // bottom
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w)
    }
    // left
    if (this.walls[3]) {
      line(x, y + w, x, y)
    }
    if (this.solved) {
      noStroke()
      fill(150, 150, 255, 255)
      rect(
        x + padding * 2,
        y + padding * 2,
        w - padding * 4,
        w - padding * 4,
        padding * 5
      )
      textFont('Georgia')
      fill(0, 0, 0)
      textSize(14)
      text(
        this.letter != -1 ? this.letter : '',
        x + w / 2 - padding,
        y + w / 2 + padding
      )
    } else if (this.path) {
      noStroke()
      fill(250, 150, 243, 200)
      rect(
        x + padding * 2,
        y + padding * 2,
        w - padding * 4,
        w - padding * 4,
        padding * 5
      )
      textFont('Georgia')
      fill(0, 0, 0)
      textSize(14)
      text(
        this.letter != -1 ? this.letter : '',
        x + w / 2 - padding,
        y + w / 2 + padding
      )
    } else if (this.visited) {
      noStroke()
      fill(250, 150, 243, 50)
      rect(
        x + padding * 2,
        y + padding * 2,
        w - padding * 4,
        w - padding * 4,
        padding * 5
      )
    }
  }
}
