//* MVP 
// grey comments are guesses on how I could go about it

//? create a grid 
// create a grid how Nick did in lesson needs to be a lot more bigger and 
// the grid itself will be hidden*

//? add blueprint onto grid, for MVP it will be a static board
// Add the board on top of the grid, this could be coordinates of where 
// all the walls will go or viceversa

//? place the food that pacman needs to collect
//place food on all free path cells

// start the game - loop 

//? spawn pacman in predifined location without any movement
//span pacman under the ghost spawn box 

//? spawn 4 ghosts in spawn box
//spawn 4 ghosts in the ghost box and make them exit with a delay of 2 seconds
// each. i.e. second won't leave until first is gone for 2 seconds

//? have ghosts move towards random directions in the grid
// make ghosts move forward until they have to turn if there are 2 or more 
// choices at an intersection choose randomly

//? listen to player input and turn packman accoridngly
// listen to player input allow players to play with either W/A/S/D or arrow keys

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
