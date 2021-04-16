const grid = document.querySelector('#game-window')
const width = 25
const height = (width + 3)
let gridArray = []
let score = 0
//* MVP 
// grey comments are guesses on how I could go about it





//? create a grid 
// create a grid how Nick did in lesson needs to be a lot more bigger and 
// the grid itself will be hidden*
for (let i = 1; i <= width ** 2 + (width * 3); i++) {
  const div = document.createElement('div')
  div.style.width = `${100 / width}%`
  div.id = i
  div.style.height = `${100 / height}%`
  grid.appendChild(div)
  gridArray.push(div)
}

//? add blueprint onto grid, for MVP it will be a static board
// Add the board on top of the grid, this could be coordinates of where 
// all the walls will go or viceversa


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
// from the walls array gives the class wall to all walls
map1.forEach(number => {
  gridArray[number - 1].classList.add('wall')
})
// gives the class empty to all other boxes outside player path 
map1Exclude.forEach(number => {
  gridArray[number - 1].classList.add('empty')
})




//? place the food that pacman needs to collect
//place food on all free path cells
gridArray.forEach(cell => {
  if (cell.classList[0] !== 'wall' && cell.classList[0] !== 'empty') {
    const span = document.createElement('span')
    span.classList.add('food')
    cell.appendChild(span)
    cell.classList.add('path')
  }
})

// ? start the game - loop 
let speed = 0
// let x = 0
// let y = 0
setInterval(() => {
  //! pacman stops moving if it hits a wall while moving in a 
  //! given direction until player turns pacman
  if (gridArray[pacman + speed].classList[0] === 'path') {
    gridArray[pacman].classList.remove('pacman')
    pacman = pacman + speed
    //! pacman eats the food as it moves trough the maze
    gridArray[pacman].classList.add('pacman')
    if (gridArray[pacman].children[0].classList[0] === 'food') {
      gridArray[pacman].children[0].classList.remove('food')
      //keep tracked of food eaten
      score++
    }

  }

}, 300)
//? spawn pacman in predifined location without any movement
//span pacman under the ghost spawn box 
let pacman = 562
gridArray[pacman].classList.add('pacman')


//? spawn 4 ghosts in spawn box
//spawn 4 ghosts in the ghost box and make them exit with a delay of 2 seconds
// each. i.e. second won't leave until first is gone for 2 seconds
const ghosts = [287, 336, 337, 338]

ghosts.forEach(ghost => {
  gridArray[ghost].classList.add('ghost')
  gridArray[ghost].children[0].classList.remove('food')
})

//? have ghosts move towards random directions in the grid
// make ghosts move forward until they have to turn if there are 2 or more 
// choices at an intersection choose randomly


//? listen to player input and turn packman accoridngly
// listen to player input allow players to play with either W/A/S/D or arrow keys

document.addEventListener('keydown', (e) => {
  const key = e.key
  if (key === 'w' || key === 'ArrowUp') {
    if (gridArray[pacman - width].classList[0] !== 'wall') {
      gridArray[pacman].classList.remove('pacman')
      speed = 0
      speed -= width
      gridArray[pacman].classList.add('pacman')
    }
  } else if (key === 's' || key === 'ArrowDown') {
    if (gridArray[pacman + width].classList[0] !== 'wall') {
      gridArray[pacman].classList.remove('pacman')
      speed = 0
      speed += width
      gridArray[pacman].classList.add('pacman')
    }
  } else if (key === 'a' || key === 'ArrowLeft') {
    if (gridArray[pacman - 1].classList[0] !== 'wall') {
      gridArray[pacman].classList.remove('pacman')
      speed = 0
      speed = speed - 1
      gridArray[pacman].classList.add('pacman')
    }
  } else if (key === 'd' || key === 'ArrowRight') {
    if (gridArray[pacman + 1].classList[0] !== 'wall') {
      gridArray[pacman].classList.remove('pacman')
      speed = 0
      speed = speed + 1
      gridArray[pacman].classList.add('pacman')
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


