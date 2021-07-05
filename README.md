# project-1


## Summary:
This is the first porject I made as part of my bootcamp in general assembly. We had one week to do this project so it felt like a lot of time until I actually started the project at which point there where lots of ups and downs but I learned a ton a long the way. 

## Aproach 
I was thinking of making the grid have x and y coordinates which took up most of the start of the week
To make the level I used an array that contained all the walls

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
### Pacman direction
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