//create x and y coordinated grid (got this from stack overflow I think I understand it)
//create a function that accepts 2 values column count and row count
function createMap(rowCount, columnCount) {
  //empty array
  const map = []
  //loop for each row, in our case is the height
  for (let x = 1; x <= rowCount; x++) {
    //create an array to store all values of the row
    map[x] = [] // set up inner array
    //for each row create x amount of cell in our case is the width
    for (let y = 1; y <= columnCount; y++) {
      //call add cell with the x and y value
      addCell(map, x, y)
    }
  }
  return map
}
//at the x and y location populate a cell
// create a new object on x and y
const addCell = (map, x, y) => map[x][y] = cell(x, y)

function cell(x, y) {
  //create a div
  const div = document.createElement('div')
  //set div width and height
  div.style.width = `${100 / WIDTH}%`
  div.style.height = `${100 / HEIGHT}%`
  //set the div id to the cell's x and y coordinates
  div.setAttribute('id', `${x}:${y}`)
  div.f = 0
  div.g = 0
  div.h = 0
  div.debug = ''
  div.parent = null
  div.pos = { y: x, x: y }
  // div.innerText = `${x + 1}:${y + 1}`
  //append div to the grid
  elements.grid.appendChild(div)
  //push the div into a grid array
  gridArray.push(div)
  return div
}




//? listen to player input and turn packman accoridngly
// listen to player input allow players to play with either W/A/S/D or arrow keys
function pacmanChangeDirectionOnInput() {
  if (pacman.x === undefined || pacman.y === undefined) return
  document.addEventListener('keydown', (e) => {
    //get keypressed
    const key = e.key
    if (key === 'Escape') {
      elements.mainWindow.style.display = 'none'
      elements.resultWindow.style.display = 'none'
      elements.mainMenu.style.display = 'flex'
      for (let i = 1; i < 999; i++) {
        clearInterval(i)
      }
    }
    let up, down, left, right

    up = mappedGridArray[pacman.y - 1][pacman.x]
    down = mappedGridArray[pacman.y + 1][pacman.x]
    left = mappedGridArray[pacman.y][pacman.x - 1]
    right = mappedGridArray[pacman.y][pacman.x + 1]

    //check which key it was and check if the tile to move is not a wall 
    // change speed x and y values accordingly
    //also check if pacman is already moving in that direction
    if (key === 'w' || key === 'ArrowUp') {
      if (!up.classList.contains('wall') && pacman.speed.y !== -1) {
        pacman.speed.x = 0
        pacman.speed.y = -1
        document.documentElement.style
          .setProperty('--rotateVal', '-90deg')
      }
    } else if (key === 's' || key === 'ArrowDown') {
      if (!down.classList.contains('wall') && pacman.speed.y !== 1) {
        pacman.speed.x = 0
        pacman.speed.y = 1
        document.documentElement.style
          .setProperty('--rotateVal', '90deg')
      }
    } else if (key === 'a' || key === 'ArrowLeft') {
      if (!left.classList.contains('wall') && pacman.speed.x !== -1) {
        pacman.speed.y = 0
        pacman.speed.x = -1
        document.documentElement.style
          .setProperty('--rotateVal', '180deg')
      }
    } else if (key === 'd' || key === 'ArrowRight') {
      if (!right.classList.contains('wall') && pacman.speed.x !== 1) {
        pacman.speed.y = 0
        pacman.speed.x = 1
        document.documentElement.style
          .setProperty('--rotateVal', '360deg')
      }
    }
  })

}

//? Ghost direction changes are decided below

function checkDirection(availableDirections, ghost) {
  const cellUp = mappedGridArray[ghost.y - 1][ghost.x]
  const cellDown = mappedGridArray[ghost.y + 1][ghost.x]
  const cellLeft = mappedGridArray[ghost.y][ghost.x - 1]
  const cellRight = mappedGridArray[ghost.y][ghost.x + 1]
  //check if there is a path up
  if (cellUp.type === 'path'
    && availableDirections.includes('up')
    && cellUp.querySelector('.ghost') === null) {
    ghost.speed.x = 0
    ghost.speed.y = -1
    //check if there is a path on the right and then move to the rigt
    //if a wall is found then call this function again
  } else if (cellRight.type === 'path'
    && availableDirections.includes('right')
    && cellRight.querySelector('.ghost') === null) {
    ghost.speed.y = 0
    ghost.speed.x = 1
    //check if there is a path down
  } else if (cellDown.type === 'path'
    && availableDirections.includes('down')
    && cellDown.querySelector('.ghost') === null) {
    ghost.speed.x = 0
    ghost.speed.y = 1
    //check if there is a path on the left
  } else if (cellLeft.type === 'path'
    && availableDirections.includes('left')
    && cellLeft.querySelector('.ghost') === null) {
    ghost.speed.y = 0
    ghost.speed.x = -1
  }
}

//check if there all available directions
function availableDirections(ghost) {
  if (ghost.speed.x === -1 || ghost.speed.x === 1) {
    return ['up', 'down']
  }
  if (ghost.speed.y === -1 || ghost.speed.y === 1) {
    return ['right', 'left']
  }
  return ['up', 'down', 'left', 'right']
}

function changeDirection(ghost) {
  // check if the path ahead is not a wall or a tunnel
  if (ghost.current().classList.contains('portalLeft')
    || ghost.current().classList.contains('portalRight')) {
    ghost.teleport()
    return
  }
  if (ghost.target().classList.contains('path')) {
    //for each block that the ghost is at give me all available directions
    //if the available direction is more than one pick randomly between the two
    //change direction
    const difAvailableDirections = availableDirections(ghost)
    const randomChoice = Math.floor(Math.random() * difAvailableDirections.length)
    checkDirection([difAvailableDirections[randomChoice]], ghost)
  } else if (ghost.target().type === 'wall') {
    checkDirection(availableDirections(ghost), ghost)
  }
}


//? Smart ghosts


