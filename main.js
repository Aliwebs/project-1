const grid = document.querySelector('#game-window')
const width = 25
const height = (width + 3)
let gridArray = new Array()
const displayScore = document.querySelector('#score')
let score = 0
let isPlaying = true
const activeGhosts = new Array()
const runSpeed = 300
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
      activeGhosts.splice(ghostId, 1)

      mappedGridArray[this.y][this.x].querySelector('.ghostBlink').remove()
      spawnGhosts(ghostId)

    }

    //I check if pacman hit a ghost if they did then display score and stop interval 
    //! player loses if pacman hits a ghost
    if (mappedGridArray[this.y][this.x].querySelector('.ghost') !== null) {
      displayScore.innerHTML = `<em>Your loose!</em> score is: ${score}`
      for (let i = 0; i < 999; i++) {
        clearInterval(i)
      }
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
      if (document.querySelectorAll('.food').length === 0) {
        displayScore.innerHTML = `<em>Your won!</em> score is: ${score}`
        for (let i = 0; i < 999; i++) {
          clearInterval(i)
        }
      }
    }
    if (mappedGridArray[this.y][this.x].querySelector('.bigFood') !== null) {
      mappedGridArray[this.y][this.x].querySelector('.bigFood').remove('bigFood')
      this.bigFood = true
      setTimeout(() => {
        this.bigFood = false
      }, 5000)
    }
  },
  spawn(y, x) {
    const pacmanSprite = document.createElement('span')
    pacmanSprite.classList.add('pacman')
    if (x !== undefined && y !== undefined) {
      mappedGridArray[y][x].appendChild(pacmanSprite)
    } else {
      mappedGridArray[this.y][this.x].appendChild(pacmanSprite)
    }
    pacmanChangeDirectionOnInput()
    return pacmanSprite
  },
  remove() {
    mappedGridArray[this.y][this.x].querySelector('.pacman').remove()
  },
  teleport() {
    if (this.y === 14 && this.x === 1) {
      this.remove()
      this.spawn(25, 14)
    } else if (this.y === 25 && this.x === 14) {
      this.remove()
      this.spawn(1, 14)
    }
  },
}


function ghost(y, x, id) {
  return {
    x: x,
    y: y,
    speed: { x: 1, y: 0 },
    visited: [],
    move() {
      if (mappedGridArray[this.y][this.x].querySelector('.ghost') !== null) {
        //remove the ghost from current position
        this.remove()
        //moves ghost in that direction
        this.x += (this.speed.x)
        this.y += (this.speed.y)
        //add ghost on new position
        this.spawn()
      }
      if (pacman.bigFood) {
        activeGhosts.forEach(activeGhost => {
          activeGhost.blinking()
        })
      } else {
        this.stopBlinking()
      }
      //add position to visited
      this.visited.push(`${this.y}:${this.x}`)
    },
    spawn() {
      const ghostSprite = document.createElement('span')
      ghostSprite.classList.add('ghost')
      ghostSprite.setAttribute('id', id)
      mappedGridArray[this.y][this.x].appendChild(ghostSprite)
      return this
    },
    remove() {
      mappedGridArray[this.y][this.x].querySelector('.ghost').remove()
    },
    blinking() {
      let ghost
      if (mappedGridArray[this.y][this.x].querySelector('.ghost') !== null) {
        ghost = mappedGridArray[this.y][this.x].querySelector('.ghost')
        ghost.classList.add('ghostBlink')
      }
    },
    stopBlinking() {
      let ghost
      if (mappedGridArray[this.y][this.x].querySelector('.ghost') !== null) {
        ghost = mappedGridArray[this.y][this.x].querySelector('.ghost')
        ghost.classList.remove('ghostBlink')
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

//? set up teleport tunnel so ghosts cannot enter it and only pacman can
mappedGridArray[14][20].classList.remove('path')
mappedGridArray[14][6].classList.remove('path')
mappedGridArray[14][20].classList.add('tunnel')
mappedGridArray[14][6].classList.add('tunnel')

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
pacman.teleport()


//? spawn 4 ghosts in spawn box
//spawn 4 ghosts in the ghost box and make them exit with a delay of 2 seconds
// each. i.e. second won't leave until first is gone for 2 seconds
function spawnGhosts(ghostName) {
  if (ghostName === undefined) {
    activeGhosts.push(ghost(12, 13, 0).spawn())
    activeGhosts.push(ghost(14, 12, 1).spawn())
    activeGhosts.push(ghost(14, 13, 2).spawn())
    activeGhosts.push(ghost(14, 14, 3).spawn())
    console.log(activeGhosts)
  } else {
    const activeNotActive = activeGhosts.map(selectedGhost => {
      if (selectedGhost.name === ghostName) {
        return true
      }
      return false
    })
    for (let i = 0; i < activeNotActive.length; i++) {
      if (!activeGhosts[0]) {
        activeGhosts.push(ghost(12, 13, 1).spawn())
      } else if (!activeGhosts[1]) {
        activeGhosts.push(ghost(14, 12, 2).spawn())
      } else if (!activeGhosts[2]) {
        activeGhosts.push(ghost(14, 13, 3).spawn())
      } else if (!activeGhosts[3]) {
        activeGhosts.push(ghost(14, 14, 4).spawn())
      }
    }
  }
  return false
}

spawnGhosts()

const myInterval = setInterval(() => {
  //! pacman stops moving if it hits a wall while moving in a 
  //! given direction until player turns pacman
  pacman.move()
  pacman.eatFood()
  //? have ghosts move towards random directions in the grid
  // make ghosts move in a given direction until they have to turn if there are 2 or more 
  // choices at an intersection choose randomly
  activeGhosts.forEach(activeGhost => {
    changeDirection(activeGhost)
  })
}, runSpeed)



// if a path is found then move there
function checkDirection(availableDirections, ghost) {
  const cellUp = mappedGridArray[ghost.y - 1][ghost.x]
  const cellDown = mappedGridArray[ghost.y + 1][ghost.x]
  const cellLeft = mappedGridArray[ghost.y][ghost.x - 1]
  const cellRight = mappedGridArray[ghost.y][ghost.x + 1]

  //check if there is a path up
  if (cellUp.classList.contains('path')
    && availableDirections.includes('up')
    && cellUp.querySelector('.ghost') === null) {
    ghost.speed.x = 0
    ghost.speed.y = -1
    //check if there is a path on the right and then move to the rigt
    //if a wall is found then call this function again
  } else if (cellRight.classList.contains('path')
    && availableDirections.includes('right')
    && cellRight.querySelector('.ghost') === null) {
    ghost.speed.y = 0
    ghost.speed.x = 1
    //check if there is a path down
  } else if (cellDown.classList.contains('path')
    && availableDirections.includes('down')
    && cellDown.querySelector('.ghost') === null) {
    ghost.speed.x = 0
    ghost.speed.y = 1
    //check if there is a path on the left
  } else if (cellLeft.classList.contains('path')
    && availableDirections.includes('left')
    && cellLeft.querySelector('.ghost') === null) {
    ghost.speed.y = 0
    ghost.speed.x = -1
  }
}


function availableDirections(ghost) {
  if (ghost.speed.x === -1 || ghost.speed.x === 1) {
    return ['up', 'down']
  }
  if (ghost.speed.y === -1 || ghost.speed.y === 1) {
    return ['right', 'left']
  }
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


