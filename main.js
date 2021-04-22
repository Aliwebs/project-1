//* MVP
// grey comments are guesses on how I could go about it
const elements = {
  grid: document.querySelector('#game-window'),
  displayScore: document.querySelector('#score'),
  mainMenu: document.querySelector('#main-menu'),
  playBtn: document.querySelector('#play'),
  mainWindow: document.querySelector('main'),
  resultWindow: document.querySelector('#results'),
  displayResult: document.querySelector('#result'),
}

const gridArray = new Array()
const WIDTH = 25
const HEIGHT = (WIDTH + 3)
// refer to ./functions.js file
const mappedGridArray = createMap(HEIGHT, WIDTH)

let score = 0
let isPlaying = true
const activeGhosts = new Array()
const runSpeed = 500
let totalFood = document.querySelectorAll('.food').length

elements.playBtn.addEventListener('click', playGame)

const pacman = {
  //here x and y are the current coordinates
  x: 13,
  y: 23,
  //current x and y speed
  speed: { x: 0, y: 0 },
  //current element where pacman is 
  current() {
    return mappedGridArray[this.y][this.x]
  },
  //next element where pacman is going
  target() {
    return mappedGridArray[this.y + (this.speed.y)][this.x + (this.speed.x)]
  },
  bigFood: false,
  //move function removes the span element from current and moves player by x and y speed 
  //then places player there
  move() {
    if (this.target() === undefined) return

    if (!this.target().classList.contains('wall')) {
      this.remove()
      this.x += (this.speed.x)
      this.y += (this.speed.y)
      this.spawn()
    }
    //https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/

    if (this.current().querySelector('.ghostBlink') !== null
      && this.current().querySelector('.pacman') !== null) {
      const ghostId = this.current().querySelector('.ghostBlink').getAttribute('id')
      activeGhosts.splice(ghostId, 1)
      score += 200
      this.current().querySelector('.ghostBlink').remove()
      spawnGhosts(ghostId)
    }


    //! player loses if pacman hits a ghost
    if (this.current().querySelector('.ghost') !== null
      && this.current().querySelector('.pacman')) {
      //set the mainWindow to display none and set the result window to display flex
      elements.mainWindow.style.display = 'none'
      elements.resultWindow.style.display = 'flex'
      //? If player looses stop game loop and display result
      elements.displayResult.innerHTML = `<em>Your loose!</em> score is: ${score}`
      for (let i = 1; i < 999; i++) {
        clearInterval(i)
      }
    }
  },
  eatFood() {
    //! pacman eats the food as it moves trough the maze
    if (this.current().querySelector('.food') !== null) {
      this.current().querySelector('.food').remove('food')
      //increase score after eating food
      score += 10
      totalFood--
      //display score
      elements.displayScore.innerHTML = score
      //if they pick up all food then they win
      //! player wins if pacman eats all the food in the level
      if (totalFood === 0) {
        elements.mainWindow.style.display = 'none'
        elements.resultWindow.style.display = 'flex'
        //? if player wins display score (for mvp only one level)
        elements.displayResult.innerHTML = `<em>Your won!</em> score is:   ${score}`
        for (let i = 1; i < 999; i++) {
          clearInterval(i)
        }
      }
    }
    if (this.current().querySelector('.bigFood') !== null) {
      this.current().querySelector('.bigFood').remove('bigFood')
      this.bigFood = true
      setTimeout(() => {
        this.bigFood = false
      }, 10000)
    }
  },
  spawn(y, x) {
    const pacmanSprite = document.createElement('div')
    const pacmanMouth = document.createElement('div')
    pacmanMouth.classList.add('pacman_mouth')
    pacmanSprite.appendChild(pacmanMouth)
    pacmanSprite.classList.add('pacman')
    if (y !== undefined && x !== undefined) {
      this.y = y
      this.x = x
      this.current().appendChild(pacmanSprite)
    } else {
      this.current().appendChild(pacmanSprite)
    }
    return pacmanSprite
  },
  remove() {
    if (this.current().querySelector('.pacman') !== null) {
      this.current().querySelector('.pacman').remove()
    }
  },
  teleport() {
    if (this.current() !== null) {
      if (this.current().classList.contains('portalLeft')) {
        this.remove()
        this.spawn(14, 24)
      }
      if (this.current().classList.contains('portalRight')) {
        this.remove()
        this.spawn(14, 2)
      }
    }
  },
}


function ghost(y, x, id, name) {
  return {
    x: x,
    y: y,
    speed: { x: 1, y: 0 },
    visited: [],
    //current element where ghost is 
    current() {
      return mappedGridArray[this.y][this.x]
    },
    //next element where ghost is going
    target() {
      return mappedGridArray[this.y + (this.speed.y)][this.x + (this.speed.x)]
    },
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
    spawn(y, x) {
      const ghostSprite = document.createElement('span')
      ghostSprite.classList.add('ghost')
      ghostSprite.setAttribute('id', id)
      ghostSprite.style.background = `url(./assets/${name}.svg)`
      if (y !== undefined && x !== undefined) {
        this.y = y
        this.x = x
        this.current().appendChild(ghostSprite)
      } else {
        this.current().appendChild(ghostSprite)
      }
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
    teleport() {
      if (this.current() !== null) {
        if (this.current().classList.contains('portalLeft')) {
          this.remove()
          this.spawn(14, 24)
        }
        if (this.current().classList.contains('portalRight')) {
          this.remove()
          this.spawn(14, 2)
        }
      }
    },
  }
}


function setup() {
  //? add blueprint onto grid, for MVP it will be a static board
  // from the map1 array gives the class wall to all walls
  map1.forEach((coordinate) => {
    mappedGridArray[coordinate[0]][coordinate[1]].classList.add('wall')
    mappedGridArray[coordinate[0]][coordinate[1]].weight = 0
    mappedGridArray[coordinate[0]][coordinate[1]].type = 'wall'
  })
  // gives the class empty to all other boxes outside player path that are not walls
  map1Exclude.forEach(number => {
    gridArray[number - 1].classList.add('empty')
  })

  // const allWalls = mappedGridArray.map(column => {
  //   return column.filter((cell, index) => {
  //     if (cell.classList.contains('wall')
  //       && cell[index + 1].classList.contains('wall')) {

  //     }
  //   })
  // })

  //? place the food that pacman needs to collect
  //place food on all free path cells
  mappedGridArray.forEach(row => {
    row.forEach(cell => {
      if (!cell.classList.contains('wall') && cell.classList[0] !== 'empty') {
        const span = document.createElement('span')
        span.classList.add('food')
        cell.appendChild(span)
        cell.type = 'path'
        cell.classList.add('path')
      }
    })
  })

  const bigFoodCord = [[5, 2], [5, 24], [22, 2], [22, 24]]

  bigFoodCord.forEach(bigFood => {
    const elt = mappedGridArray[bigFood[0]][bigFood[1]].querySelector('.food')
    elt.classList.remove('food')
    elt.classList.add('bigFood')
  })

  //? set up teleport tunnels
  mappedGridArray[14][1].classList.add('portalLeft')
  mappedGridArray[14][25].classList.add('portalRight')

  //? spawn pacman in predifined location without any movement
  //span pacman under the ghost spawn box 
  pacman.spawn()
  pacmanChangeDirectionOnInput()

  //? spawn 4 ghosts in spawn box
  spawnGhosts()
}



// ? Code to create a static board
//? Basically a map builder
// let staticGrid = []

// elements.grid.addEventListener('click', (e) => {
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




function playGame() {
  isPlaying = true
  if (!isPlaying) return
  setup()
  elements.mainMenu.style.display = 'none'
  elements.mainWindow.style.display = 'block'
  // ? start the game - loop 
  const myInterval = setInterval(() => {
    //? Teleport pacman
    if (pacman.current().classList.contains('portalLeft')
      || pacman.current().classList.contains('portalRight')) {
      pacman.teleport()
      return
    }

    pacman.move()
    //! pacman stops moving if it hits a wall while moving in a 
    //! given direction until player turns pacman
    //start pacman move and eatFood methods
    pacman.eatFood()
  }, runSpeed - 200)


  const myInterval1 = setInterval(() => {
    //? have ghosts move towards random directions in the grid
    // make ghosts move in a given direction until they have to turn if there are 2 or more 
    // choices at an intersection choose randomly
    activeGhosts.forEach(activeGhost => {
      changeDirection(activeGhost)
    })
  }, runSpeed)

}



astar.search(mappedGridArray, mappedGridArray[pacman.y][pacman.x], mappedGridArray[23][23])


//* enhancements

//? Smart Ghosts
//? will choose one according to time left
// 1 Make ghosts move towards the general direction of the player
// 2 Make ghosts draw a path to the player path can overlap 

//? Responsive design

//? Persistent leaderboard using localStorage

//? Add more boards 
//? will choose one according to time left
// 1 Add different static boards for each level up
// 2 Dynamically generate boards 

//? Each board gets more difficult
// I will do this by decresing exists from paths



