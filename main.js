const grid = document.querySelector('#game-window')
const width = 25
const height = (width + 3)
let gridArray = []
let score = 0
const playerVelocity = { x: 0, y: 0 }
//* MVP 
// grey comments are guesses on how I could go about it


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
map1.forEach(number => {
  gridArray[number - 1].classList.add('wall')
})
// gives the class empty to all other boxes outside player path 
map1Exclude.forEach(number => {
  gridArray[number - 1].classList.add('empty')
})

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
// let playerSpeed = 0
setInterval(() => {
  //! pacman stops moving if it hits a wall while moving in a 
  //! given direction until player turns pacman
  //check if the next cell is a path
  if (mappedGridArray[pacman.y + (playerVelocity.y)][pacman.x + (playerVelocity.x)].classList.contains('path')) {
    mappedGridArray[pacman.y][pacman.x].classList.remove('pacman')
    pacman.x += (playerVelocity.x)
    pacman.y += (playerVelocity.y)
    mappedGridArray[pacman.y][pacman.x].classList.add('pacman')
    //! pacman eats the food as it moves trough the maze
    if (mappedGridArray[pacman.y][pacman.x].children[0].classList[0] === 'food') {
      mappedGridArray[pacman.y][pacman.x].children[0].classList.remove('food')
      //keep tracked of food eaten
      score++
    }

  }

}, 500)
//? spawn pacman in predifined location without any movement
//span pacman under the ghost spawn box 
const pacman = { y: 23, x: 13 }
mappedGridArray[pacman.y][pacman.x].classList.add('pacman')



//? spawn 4 ghosts in spawn box
//spawn 4 ghosts in the ghost box and make them exit with a delay of 2 seconds
// each. i.e. second won't leave until first is gone for 2 seconds
const ghosts = [{ y: 12, x: 13 }, { y: 14, x: 12 }, { y: 14, x: 13 }, { y: 14, x: 14 }]
const ghostSpeed = [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
ghosts.forEach(ghost => {
  mappedGridArray[ghost.y][ghost.x].classList.add('ghost')
  mappedGridArray[ghost.y][ghost.x].children[0].classList.remove('food')
})

//? have ghosts move towards random directions in the grid
// make ghosts move forward until they have to turn if there are 2 or more 
// choices at an intersection choose randomly

setInterval(() => {

  ghostMove(ghosts[0], ghostSpeed[0])

}, 500)


function ghostMove(ghost, speed) {
  if (mappedGridArray[ghost.y + (speed.y)][ghost.x + (speed.x)].classList.contains('path')) {
    mappedGridArray[ghost.y][ghost.x].classList.remove('ghost')
    console.log(speed)
    ghost.x += (speed.x)
    ghost.y += (speed.y)
    mappedGridArray[ghost.y][ghost.x].classList.add('ghost')
  } else if (!mappedGridArray[ghost.y + (speed.y)][ghost.x + (speed.x)].classList.contains('path')) {
    speed.x = 0
    speed.y = 0
    let foundPath = false
    //check if there is a path on the right and then move to the rigt
    //if a wall is found then call this function again
    if (!mappedGridArray[ghost.y][ghost.x + 1].classList.contains('wall') && !foundPath) {
      foundPath = true
      mappedGridArray[ghost.y][ghost.x].classList.remove('ghost')
      speed.y = 0
      speed.x = 0
      ghost.x += 1
      speed.x = 1
      mappedGridArray[ghost.y][ghost.x].classList.add('ghost')
      //check if there is a path down
    } else if (!mappedGridArray[ghost.y + 1][ghost.x].classList.contains('wall') && !foundPath) {
      foundPath = true
      mappedGridArray[ghost.y][ghost.x].classList.remove('ghost')
      speed.y = 0
      speed.x = 0
      ghost.y += 1
      speed.y = 1
      mappedGridArray[ghost.y][ghost.x].classList.add('ghost')
    }
    //check if there is a path on the left
    if (!mappedGridArray[ghost.y][ghost.x - 1].classList.contains('wall') && !foundPath) {
      foundPath = true
      mappedGridArray[ghost.y][ghost.x].classList.remove('ghost')
      speed.y = 0
      speed.x = 0
      ghost.x -= 1
      speed.x = -1
      mappedGridArray[ghost.y][ghost.x].classList.add('ghost')
      //check if there is a path up
    } else if (!mappedGridArray[ghost.y - 1][ghost.x].classList.contains('wall') && !foundPath) {
      foundPath = true
      mappedGridArray[ghost.y][ghost.x].classList.remove('ghost')
      speed.y = 0
      speed.x = 0
      ghost.y -= 1
      speed.y = -1
      mappedGridArray[ghost.y][ghost.x].classList.add('ghost')

    }
  }
}




//check if there is a path on the bottom



//? listen to player input and turn packman accoridngly
// listen to player input allow players to play with either W/A/S/D or arrow keys

document.addEventListener('keydown', (e) => {
  const key = e.key
  if (key === 'w' || key === 'ArrowUp') {
    //note - 1 is the current position, because arrays start at 0?
    if (!mappedGridArray[pacman.y - 1][pacman.x].classList.contains('wall') && playerVelocity.y !== -1) {
      mappedGridArray[pacman.y][pacman.x].classList.remove('pacman')
      playerVelocity.y = 0
      playerVelocity.x = 0
      pacman.y -= 1
      playerVelocity.y = -1
      mappedGridArray[pacman.y][pacman.x].classList.add('pacman')
    }
  } else if (key === 's' || key === 'ArrowDown') {
    if (!mappedGridArray[pacman.y + 1][pacman.x].classList.contains('wall') && playerVelocity.y !== 1) {
      mappedGridArray[pacman.y][pacman.x].classList.remove('pacman')
      playerVelocity.y = 0
      playerVelocity.x = 0
      pacman.y += 1
      playerVelocity.y = 1
      mappedGridArray[pacman.y][pacman.x].classList.add('pacman')
    }
  } else if (key === 'a' || key === 'ArrowLeft') {
    if (!mappedGridArray[pacman.y][pacman.x - 1].classList.contains('wall') && playerVelocity.x !== -1) {
      mappedGridArray[pacman.y][pacman.x].classList.remove('pacman')
      playerVelocity.y = 0
      playerVelocity.x = 0
      pacman.x -= 1
      playerVelocity.x = -1

      mappedGridArray[pacman.y][pacman.x].classList.add('pacman')
    }
  } else if (key === 'd' || key === 'ArrowRight') {
    if (!mappedGridArray[pacman.y][pacman.x + 1].classList.contains('wall') && playerVelocity.x !== 1) {
      mappedGridArray[pacman.y][pacman.x].classList.remove('pacman')
      playerVelocity.y = 0
      playerVelocity.x = 0
      pacman.x += 1
      playerVelocity.x = 1
      mappedGridArray[pacman.y][pacman.x].classList.add('pacman')
    }
  }

})



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


