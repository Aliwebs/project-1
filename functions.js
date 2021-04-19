//create x and y coordinated grid (got this from stack overflow I think I understand it)
//create a function that accepts 2 values column count and row count
function createMap(rowCount, columnCount) {
  //empty array
  const map = []
  //loop for each row, in our case is the height
  for (let x = 1; x <= rowCount; x++) {
    //create an array to store all values of the row
    map[x] = [] // set up inner array
    //for each row create x amount of cell in our case is the width
    for (let y = 1; y <= columnCount; y++) {
      //call add cell with the x and y value
      addCell(map, x, y)
    }
  }
  return map
}
//at the x and y location populate a cell
// create a new object on x and y
const addCell = (map, x, y) => map[x][y] = cell(x, y)

function cell(x, y) {
  //create a div
  const div = document.createElement('div')
  //set div width and height
  div.style.width = `${100 / width}%`
  div.style.height = `${100 / height}%`
  //set the div id to the cell's x and y coordinates
  div.setAttribute('id', `${x + 1}:${y + 1}`)
  // div.innerText = `${x + 1}:${y + 1}`
  //append div to the grid
  grid.appendChild(div)
  //push the div into a grid array
  gridArray.push(div)
  return div
}

