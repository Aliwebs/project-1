const grid = document.querySelector('#game-window')
const width = 25
const height = (width + 3)
let gridArray = new Array()
const displayScore = document.querySelector('#score')
let score = 0
let isPlaying = true
let clyde = {}
let blinky = {}
let pinky = {}
let inky = {}
const ghostsList = {
  clyde: [12, 13, 'clyde'],
  blinky: [14, 12, 'blinky'],
  pinky: [14, 13, 'pinky'],
  inky: [14, 14, 'inky'],
}

const runSpeed = 500
//* MVP 
// grey comments are guesses on how I could go about it

const pacman = {
  //here x and y are the current coordinates
  x: 13,
  y: 23,
  //current x and y speed
  speed: { x: 0, y: 0 },
  bigFood: false,
  //move function removes the span element from current and moves player by x and y speed 
  //then places player there
  move() {
    if (!mappedGridArray[this.y + (this.speed.y)][this.x + (this.speed.x)].classList.contains('wall')) {
      this.remove()
      this.x += (this.speed.x)
      this.y += (this.speed.y)
      this.spawn()
    }

    if (mappedGridArray[this.y][this.x].querySelector('.ghostBlink') !== null) {
      const ghostId = mappedGridArray[this.y][this.x].querySelector('.ghostBlink').getAttribute('id')
      mappedGridArray[this.y][this.x].querySelector('.ghostBlink').remove()
      // ${ ghostId } = ghost(ghostsList[ghostId[0]], ghostsList[ghostId][1], ghostsList[ghostId][2]).spawn()
    }

    //I check if pacman hit a ghost if they did then display score and stop interval 
    if (mappedGridArray[this.y][this.x].querySelector('.ghost') !== null) {
      console.log('you loose')
      displayScore.innerHTML = `<em>Your loose!</em> score is: ${score}`
      //! player loses if pacman hits a ghost
      mappedGridArray[this.y][this.x].querySelector('pacman').remove()
      clearInterval(myInterval)
    }
  },
  eatFood() {
    //! pacman eats the food as it moves trough the maze
    if (mappedGridArray[this.y][this.x].querySelector('.food') !== null) {
      mappedGridArray[this.y][this.x].querySelector('.food').remove('food')
      //increase score after eating food
      score++
      //display score
      displayScore.innerHTML = `Your score is: ${score}`
      //if they pick up all food then they win
      if (document.querySelectorAll('.food').length - 10 === 0) {
        displayScore.innerHTML = `<em>Your won!</em> score is: ${score}`
        console.log('you won')
      }
    }
    if (mappedGridArray[this.y][this.x].querySelector('.bigFood') !== null) {
      mappedGridArray[this.y][this.x].querySelector('.bigFood').remove('bigFood')
      this.bigFood = true
      // clyde.blinking()
      // blinky.blinking()
      // pinky.blinking()
      // inky.blinking()
    }
  },
  spawn() {
    const pacmanSprite = document.createElement('span')
    pacmanSprite.classList.add('pacman')
    mappedGridArray[this.y][this.x].appendChild(pacmanSprite)
    pacmanChangeDirectionOnInput()
    return pacmanSprite
  },
  remove() {
    mappedGridArray[this.y][this.x].querySelector('.pacman').remove()
  },
}


function ghost(y, x, name) {
  return {
    name: name,
    x: x,
    y: y,
    speed: { x: 1, y: 0 },
    visited: [],
    move() {
      //remove the ghost from current position
      mappedGridArray[this.y][this.x].querySelector('.ghost').remove()
      //moves ghost in that direction
      this.x += (this.speed.x)
      this.y += (this.speed.y)
      //add ghost on new position
      this.spawn()
      if (pacman.bigFood) {
        clyde.blinking()
        blinky.blinking()
        pinky.blinking()
        inky.blinking()
      }
      //add position to visited
      this.visited.push(`${this.y}:${this.x}`)
    },
    spawn() {
      const ghostSprite = document.createElement('span')
      ghostSprite.classList.add('ghost')
      ghostSprite.setAttribute('id', name)
      mappedGridArray[this.y][this.x].appendChild(ghostSprite)
      return this
    },
    remove() {
      mappedGridArray[this.y][this.x].querySelector('.ghost').remove()
    },
    blinking() {
      if (mappedGridArray[this.y][this.x].querySelector('.ghost') !== null) {
        const ghost = mappedGridArray[this.y][this.x].querySelector('.ghost')
        ghost.classList.add('ghostBlink')
      }
    },
  }
}


// refer to ./functions.js file
const mappedGridArray = createMap(height, width)


//? add blueprint onto grid, for MVP it will be a static board
// Add the board on top of the grid, this could be coordinates of where 
// all the walls will go or viceversa
// from the walls array gives the class wall to all walls
map1.forEach((coordinate) => {
  mappedGridArray[coordinate[0]][coordinate[1]].classList.add('wall')
})


// gives the class empty to all other boxes outside player path 
map1Exclude.forEach(number => {
  gridArray[number - 1].classList.add('empty')
})

//mappedGridArray.forEach()


// ? Code to create a static board

//? Basically a map builder
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

const bigFoodCord = [[5, 2], [5, 24], [22, 2], [23, 10]]

bigFoodCord.forEach(bigFood => {
  const element = mappedGridArray[bigFood[0]][bigFood[1]].querySelector('.food')
  element.classList.remove('food')
  element.classList.add('bigFood')
})

// ? start the game - loop 



//? spawn pacman in predifined location without any movement
//span pacman under the ghost spawn box 
pacman.spawn()


//? spawn 4 ghosts in spawn box
//spawn 4 ghosts in the ghost box and make them exit with a delay of 2 seconds
// each. i.e. second won't leave until first is gone for 2 seconds
clyde = ghost(ghostsList.clyde[0], ghostsList.clyde[1], ghostsList.clyde[2]).spawn()
blinky = ghost(ghostsList.blinky[0], ghostsList.blinky[1], ghostsList.blinky[2]).spawn()
pinky = ghost(ghostsList.pinky[0], ghostsList.pinky[1], ghostsList.pinky[2]).spawn()
inky = ghost(ghostsList.inky[0], ghostsList.inky[1], ghostsList.inky[2]).spawn()

const myInterval = setInterval(() => {
  //! pacman stops moving if it hits a wall while moving in a 
  //! given direction until player turns pacman
  pacman.move()
  pacman.eatFood()

  //? have ghosts move towards random directions in the grid
  // make ghosts move in a given direction until they have to turn if there are 2 or more 
  // choices at an intersection choose randomly
  changeDirection(clyde)
  changeDirection(blinky)
  changeDirection(pinky)
  changeDirection(inky)

}, runSpeed)



// if a path is found then move there
function checkDirection(availableDirections, ghost) {
  const cellUp = mappedGridArray[ghost.y - 1][ghost.x]
  const cellDown = mappedGridArray[ghost.y + 1][ghost.x]
  const cellLeft = mappedGridArray[ghost.y][ghost.x - 1]
  const cellRight = mappedGridArray[ghost.y][ghost.x + 1]

  //check if there is a path up
  if (!cellUp.classList.contains('wall')
    && availableDirections.includes('up')
    && cellUp.querySelector('.ghost') === null) {
    ghost.speed.x = 0
    ghost.speed.y = -1
    //check if there is a path on the right and then move to the rigt
    //if a wall is found then call this function again
  } else if (!cellRight.classList.contains('wall')
    && availableDirections.includes('right')
    && cellRight.querySelector('.ghost') === null) {
    ghost.speed.y = 0
    ghost.speed.x = 1
    //check if there is a path down
  } else if (!cellDown.classList.contains('wall')
    && availableDirections.includes('down')
    && cellDown.querySelector('.ghost') === null) {
    ghost.speed.x = 0
    ghost.speed.y = 1
    //check if there is a path on the left
  } else if (!cellLeft.classList.contains('wall')
    && availableDirections.includes('left')
    && cellLeft.querySelector('.ghost') === null) {
    ghost.speed.y = 0
    ghost.speed.x = -1
  }
}


function availableDirections(ghost) {
  const array = new Array()
  if (ghost.speed.x !== -1) {
    array.push('left')
  }
  if (ghost.speed.x !== 1) {
    array.push('right')
  }
  if (ghost.speed.y !== -1) {
    array.push('up')
  }
  if (ghost.speed.y !== 1) {
    array.push('down')
  }

  return array
}

function changeDirection(ghost) {
  // check if the path ahead is not a wall
  if (!mappedGridArray[ghost.y + (ghost.speed.y)][ghost.x + (ghost.speed.x)].classList.contains('wall')) {
    //for each block that the ghost is at give me all available directions
    const difAvailableDirections = availableDirections(ghost)

    //if the available direction is more than one pick randomly between the two
    //change direction 
    const randomChoice = Math.floor(Math.random() * difAvailableDirections.length)
    checkDirection([difAvailableDirections[randomChoice]], ghost)
    ghost.move()
  } else if (mappedGridArray[ghost.y + (ghost.speed.y)][ghost.x + (ghost.speed.x)].classList.contains('wall')) {
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


