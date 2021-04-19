const grid = document.querySelector('#game-window')
const width = 25
const height = (width + 3)
let gridArray = new Array()
let score = 0

//* MVP 
// grey comments are guesses on how I could go about it

const pacman = {
  x: 13,
  y: 23,
  speed: { x: 0, y: 0 },
  move() {
    if (mappedGridArray[this.y + (this.speed.y)][this.x + (this.speed.x)].classList.contains('path')) {
      mappedGridArray[this.y][this.x].classList.remove('pacman')
      this.x += (this.speed.x)
      this.y += (this.speed.y)
      mappedGridArray[this.y][this.x].classList.add('pacman')
    }
  },
  eatFood() {

  },
  spawn() {
    mappedGridArray[this.y][this.x].classList.add('pacman')
    return this
  },
}


function ghost(y, x) {
  return {
    x: x,
    y: y,
    speed: { x: 0, y: 0 },
    move() {
      //remove the ghost from current position
      mappedGridArray[this.y][this.x].classList.remove('ghost')
      //moves ghost in that direction
      this.x += (this.speed.x)
      this.y += (this.speed.y)
      //add ghost on new position
      mappedGridArray[this.y][this.x].classList.add('ghost')
    },
    spawn() {
      mappedGridArray[this.y][this.x].classList.add('ghost')
      return this
    },
  }
}


//? create a grid 
// create a grid how Nick did in lesson needs to be a lot more bigger and 
// the grid itself will be hidden*

// for (let i = 1; i <= width ** 2 + (width * 3); i++) {
//   const div = document.createElement('div')
//   div.style.width = `${100 / width}%`
//   div.innerHTML = i
//   div.style.height = `${100 / height}%`
//   grid.appendChild(div)
//   gridArray.push(div)
// }

// refer to ./functions.js file
const mappedGridArray = createMap(height, width)


//? add blueprint onto grid, for MVP it will be a static board
// Add the board on top of the grid, this could be coordinates of where 
// all the walls will go or viceversa
// from the walls array gives the class wall to all walls
map2.forEach((coordinate) => {
  mappedGridArray[coordinate[0]][coordinate[1]].classList.add('wall')
})


// gives the class empty to all other boxes outside player path 
map1Exclude.forEach(number => {
  gridArray[number - 1].classList.add('empty')
})

//mappedGridArray.forEach()


// ? Code to create a static board
// let staticGrid = []

// grid.addEventListener('click', (e) => {
//   if (e.target.localName === 'div') {
//     if (!staticGrid.includes(e.target.innerHTML)) {
//       staticGrid.push(e.target.innerHTML)
//       e.target.classList.toggle('wall')
//     } else {
//       staticGrid = staticGrid.filter(num => num !== e.target.innerHTML)
//       e.target.classList.toggle('wall')
//     }
//   }
// })

// document.querySelector('#logmap').addEventListener('click', () => {
//   staticGrid.forEach(cell => console.log(cell))
// })



//? place the food that pacman needs to collect
//place food on all free path cells
mappedGridArray.forEach(row => {
  row.forEach(cell => {
    if (!cell.classList.contains('wall') && cell.classList[0] !== 'empty') {
      const span = document.createElement('span')
      span.classList.add('food')
      cell.appendChild(span)
      cell.classList.add('path')
    }
  })
})

// ? start the game - loop 


// function eatFood() {
//   //! pacman eats the food as it moves trough the maze
//   if ([pacman.y][pacman.x].children[0].classList.contains('food')) {
//     mappedGridArray[pacman.y][pacman.x].children[0].classList.remove('food')
//     //keep tracked of food eaten
//     score++
//   }
// }


//? spawn pacman in predifined location without any movement
//span pacman under the ghost spawn box 
pacman.spawn()



//? spawn 4 ghosts in spawn box
//spawn 4 ghosts in the ghost box and make them exit with a delay of 2 seconds
// each. i.e. second won't leave until first is gone for 2 seconds
const clyde = ghost(12, 13).spawn()
const blinky = ghost(14, 12).spawn()
const pinky = ghost(14, 13).spawn()
const inky = ghost(14, 14).spawn()

setInterval(() => {
  //! pacman stops moving if it hits a wall while moving in a 
  //! given direction until player turns pacman
  //check if the next cell is a path
  pacman.move()

  //? have ghosts move towards random directions in the grid
  // make ghosts move forward until they have to turn if there are 2 or more 
  // choices at an intersection choose randomly
  changeDirection(clyde)

}, 500)



// if a path is found then move there
function checkDirection(availableDirections, ghost) {


  //check if there is a path up
  if (!mappedGridArray[ghost.y - 1][ghost.x].classList.contains('wall') && availableDirections.includes('up')) {
    ghost.speed.x = 0
    ghost.speed.y = -1
    //check if there is a path on the right and then move to the rigt
    //if a wall is found then call this function again
  } else if (!mappedGridArray[ghost.y][ghost.x + 1].classList.contains('wall') && availableDirections.includes('right')) {
    ghost.speed.y = 0
    ghost.speed.x = 1
    //check if there is a path down
  } else if (!mappedGridArray[ghost.y + 1][ghost.x].classList.contains('wall') && availableDirections.includes('down')) {
    ghost.speed.x = 0
    ghost.speed.y = 1
    //check if there is a path on the left
  } else if (!mappedGridArray[ghost.y][ghost.x - 1].classList.contains('wall') && availableDirections.includes('left')) {
    ghost.speed.y = 0
    ghost.speed.x = -1
  }
}

// store current direction in a variable
function setDirection(ghost) {
  if (ghost.speed.x === -1) {
    return 'left'
  } else if (ghost.speed.x === 1) {
    return 'right'
  } else if (ghost.speed.y === -1) {
    return 'up'
  } else if (ghost.speed.y === 1) {
    return 'down'
  }
}

function availableDirections(ghost) {
  const direction = setDirection(ghost)
  if (direction === 'down' || direction === 'up') {
    return ['right', 'left']
  } else if (direction === 'right' || direction === 'left') {
    return ['up', 'down']
  }
  return ['up', 'right', 'down', 'left']
}

function changeDirection(ghost) {
  // check if the path ahead is not a wall
  if (mappedGridArray[ghost.y + (ghost.speed.y)][ghost.x + (ghost.speed.x)].classList.contains('path')) {
    //for each block that the ghost is at give me all available directions
    const difAvailableDirections = availableDirections(ghost)

    //if the available direction is more than one pick randomly between the two
    //change direction 
    difAvailableDirections.sort()
    const randomChoice = Math.floor(Math.random() * difAvailableDirections.length)
    checkDirection([difAvailableDirections[randomChoice]], ghost)
    ghost.move()
  } else if (!mappedGridArray[ghost.y + (ghost.speed.y)][ghost.x + (ghost.speed.x)].classList.contains('path')) {
    checkDirection(availableDirections(ghost), ghost)
    ghost.move()
  }
}




//? listen to player input and turn packman accoridngly
// listen to player input allow players to play with either W/A/S/D or arrow keys
function pacmanChangeDirectionOnInput() {
  document.addEventListener('keydown', (e) => {
    //get keypressed
    const key = e.key
    //check which key it was and check if the tile to move is not a wall 
    // change speed x and y values accordingly
    //also check if the key has been pressed already
    if (key === 'w' || key === 'ArrowUp') {
      if (!mappedGridArray[pacman.y - 1][pacman.x].classList.contains('wall') && pacman.speed.y !== -1) {
        pacman.speed.x = 0
        pacman.speed.y = -1
      }
    } else if (key === 's' || key === 'ArrowDown') {
      if (!mappedGridArray[pacman.y + 1][pacman.x].classList.contains('wall') && pacman.speed.y !== 1) {
        pacman.speed.x = 0
        pacman.speed.y = 1
      }
    } else if (key === 'a' || key === 'ArrowLeft') {
      if (!mappedGridArray[pacman.y][pacman.x - 1].classList.contains('wall') && pacman.speed.x !== -1) {
        pacman.speed.y = 0
        pacman.speed.x = -1
      }
    } else if (key === 'd' || key === 'ArrowRight') {
      if (!mappedGridArray[pacman.y][pacman.x + 1].classList.contains('wall') && pacman.speed.x !== 1) {
        pacman.speed.y = 0
        pacman.speed.x = 1
      }
    }

  })

}



//! player loses if pacman hits a ghost

//! player wins if pacman eats all the food in the level

//? if player loses display score

//? if player wins display score (for mvp only one level)



//* enhancements

//? Smart Ghosts
//? will choose one according to time left
// 1 Make ghosts move towards the general direction of the player
// 2 Make ghosts draw a path to the player path can overlap 

//? Responsive design

//? Add more boards 
//? will choose one according to time left
// 1 Add different static boards for each level up
// 2 Dynamically generate boards 

//? Each board gets more difficult
// I will do this by decresing exists from paths

//? Persistent leaderboard using localStorage


