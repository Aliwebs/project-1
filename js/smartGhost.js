// algorithm to track pacman down 
// !not used in final version of game due to memory leak bug (?)
// code from https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/
const astar = {
  search: function (grid, start, end) {

    const openList = []
    const closedList = []
    openList.push(start)

    while (openList.length > 0) {


      let lowInd = 0
      //loop trough open list
      for (let i = 0; i < openList.length; i++) {
        //if open list[index] 
        if (openList[i].f < openList[lowInd].f) {
          lowInd = i
        }
      }
      // 
      const currentNode = openList[lowInd]

      // End case -- result has been found, return the traced path
      if (currentNode.pos.y === end.pos.y
        && currentNode.pos.x === end.pos.x) {
        let curr = currentNode
        const ret = []
        while (curr.parent) {
          ret.push(curr)
          curr = curr.parent
        }
        return ret.reverse()
      }

      // Normal case -- move currentNode from open to closed, process each of its neighbors
      const index = openList.indexOf(currentNode)
      openList.splice(index, 1)
      closedList.push(currentNode)
      const neighbors = astar.neighbors(grid, currentNode)

      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i]
        if (closedList.indexOf(neighbor) !== -1 || neighbor.type === 'wall') {
          // not a valid node to process, skip to next neighbor
          continue
        }

        // g score is the shortest distance from start to current node, we need to check if
        //   the path we have arrived at this neighbor is the shortest one we have seen yet
        const gScore = currentNode.g + 1 // 1 is the distance from a node to it's neighbor
        let gScoreIsBest = false


        if (openList.indexOf(neighbor) === -1) {
          // This the the first time we have arrived at this node, it must be the best
          // Also, we need to take the h (heuristic) score since we haven't done so yet

          gScoreIsBest = true
          neighbor.h = astar.heuristic(neighbor.pos, end.pos)
          openList.push(neighbor)
        } else if (gScore < neighbor.g) {
          // We have already seen the node, but last time it had a worse g (distance from start)
          gScoreIsBest = true
        }

        if (gScoreIsBest) {
          // Found an optimal (so far) path to this node.   Store info on how we got here and
          //  just how good it really is...
          neighbor.parent = currentNode
          neighbor.g = gScore
          neighbor.f = neighbor.g + neighbor.h
          neighbor.debug = 'F: ' + neighbor.f + '<br />G: ' + neighbor.g + '<br />H: ' + neighbor.h
        }
      }
    }

    // No result was found -- empty array signifies failure to find path
    return []
  },
  heuristic: function (pos0, pos1) {
    // This is the Manhattan distance
    const d1 = Math.abs(pos1.x - pos0.x)
    const d2 = Math.abs(pos1.y - pos0.y)
    return d1 + d2
  },
  neighbors: function (grid, node) {
    const ret = []
    const x = node.pos.x
    const y = node.pos.y

    // if (x > 0 && y > 0) {
    if (grid[y][x - 1]) {
      ret.push(grid[y][x - 1])
    }
    if (grid[y][x + 1]) {
      ret.push(grid[y][x + 1])
    }
    if (grid[y - 1][x]) {
      ret.push(grid[y - 1][x])
    }
    if (grid[y + 1][x]) {
      ret.push(grid[y + 1][x])
    }
    // }
    return ret
  },
}
