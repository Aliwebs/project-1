const grid = document.querySelector('#game-window')
const width = 31 //change this to 30 later
let gridArray = []
let centerBox = [383, 577]
//* MVP 
// grey comments are guesses on how I could go about it

//? create a grid 
// create a grid how Nick did in lesson needs to be a lot more bigger and 
// the grid itself will be hidden*
for (let i = 1; i <= width ** 2; i++) {
  const div = document.createElement('div')
  div.setAttribute('id', i)
  div.style.width = `${100 / width}%`
  div.style.height = `${100 / width}%`
  grid.appendChild(div)
  gridArray.push(div)
}
//? add blueprint onto grid, for MVP it will be a static board
// Add the board on top of the grid, this could be coordinates of where 
// all the walls will go or viceversa
//480 is center
// let staticGrid = []

// grid.addEventListener('click', (e) => {
//   if (e.target.localName === 'div') {
//     if (!staticGrid.includes(e.target.innerHTML)) {
//       staticGrid.push(e.target.innerHTML)
//       e.target.classList.add('wall')
//     } else {
//       staticGrid = staticGrid.filter(num => num !== e.target.innerHTML)
//       e.target.classList.remove('wall')
//     }
//   }
// })

// document.querySelector('#logmap').addEventListener('click', () => {
//   staticGrid.forEach(cell => console.log(cell))
// })

map1.forEach(number => {
  gridArray[number].classList.add('wall')
})


//? place the food that pacman needs to collect
//place food on all free path cells
gridArray.forEach(cell => {
  if (!cell.classList[0]) {
    cell.classList.add('food')
  }
})

// start the game - loop 

//? spawn pacman in predifined location without any movement
//span pacman under the ghost spawn box 
let pacman = 728
gridArray[pacman].classList.add('pacman')


//? spawn 4 ghosts in spawn box
//spawn 4 ghosts in the ghost box and make them exit with a delay of 2 seconds
// each. i.e. second won't leave until first is gone for 2 seconds
const ghosts = [357, 449, 450, 451]

ghosts.forEach(ghost => {
  gridArray[ghost].classList.add('ghosts')
})

//? have ghosts move towards random directions in the grid
// make ghosts move forward until they have to turn if there are 2 or more 
// choices at an intersection choose randomly


//? listen to player input and turn packman accoridngly
// listen to player input allow players to play with either W/A/S/D or arrow keys
let speed = 0
setInterval(() => {
  if (gridArray[pacman + speed].classList[0] === 'food') {
    gridArray[pacman].classList.remove('pacman')
    pacman = pacman + speed
    gridArray[pacman].classList.add('pacman')
    console.log(speed)
  }
}, 500)

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

//! pacman eats the food as it moves trough the maze

//! pacman stops moving if it hits a wall while moving in a 
//! given direction until player turns pacman

//keep tracked of food eaten

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


