# PACMAN clone 

## Summary

This is the first porject I made as part of my bootcamp in general assembly. We had one week to do this project so it felt like a lot of time until I actually started the project at which point there where lots of ups and downs but I learned a ton a long the way.

## Aproach

### Level grid

The approach I had when making the level grid was to have coordinates for each tile in the grid indicating the type of grid it was going to be. I was thinking this way the was the possibility of having a map builder later on. Altough I did not have time to implement the user interface for such a feature I do have the code for it (commented out) inside the main JS file. 

## Movement

### Pacman Movement

Pacman's movement relies on a method in the pacman object that moves pacman depending on his x and y speed, every time the setInterval runs this method is called

```javascript
move() {
  if (this.target() === undefined) return
  if (!this.target().classList.contains('wall')) {
    this.remove()
    this.x += (this.speed.x)
    this.y += (this.speed.y)
    this.spawn()
  }
```

#### Pacman direction

User input changes the direction of movement and does not control the speed of pacman, I tought this was a better experience for an arcade game, the snippet below is the logic that controls direction with user input

```javascript
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
```

### Ghost Movement

Ghosts move similarly using the method below on the ghost object to PACMAN except they are in their own loop and have their own speed, for level one that is slower than pacman. 

```javascript
move(movementLogic) {
      if (typeof movementLogic === 'function') {
        movementLogic(this)
        if (mappedGridArray[this.y][this.x].querySelector('.ghost') !== null) {
          //remove the ghost from current position
          this.remove()
          //moves ghost in that direction
          this.x += (this.speed.x)
          this.y += (this.speed.y)
          //add ghost on new position
          this.spawn()
        }
      } else if (movementLogic !== undefined) {
        this.remove()
        this.x = movementLogic.pos.x
        this.y = movementLogic.pos.y
        this.spawn()
      }
      if (pacman.bigFood) {
        const array = Object.entries(activeGhosts)
        for (let i = 1; i < array.length; i++) {
          array[i][1].blinking()
        }
      } else {
        this.stopBlinking()
      }
      //add position to visited
      this.visited.push(`${this.y}:${this.x}`)
    }
```
