var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')
d3.nestBy = jp.nestBy



function log(...args){ console.log.apply(null, args) }

var str = fs.readFileSync('test.txt', 'utf8')
var str = fs.readFileSync('actual.txt', 'utf8')

var lines = str.split('\n')


ogGrid = lines.map(d => {
  return d.split('').map(d => +d)
})

var xm = ogGrid[0].length
var ym = ogGrid.length

grid = []

d3.cross(d3.range(5), d3.range(5)).forEach(([X, Y]) => {
  ogGrid.forEach((row, y) => {
    if (!grid[y + ym*Y]) grid[y + ym*Y] = []

    row.forEach((d, x) => {
      var n = d + X + Y
      while (n > 9) n = n - 9
      grid[y + ym*Y][x + xm*X] = n
    })
  })
})

// log(grid[0].join(''))

// 11637517422274862853338597396444961841755517295286
// 11637517422274862853338597396444961841755517295286



var xm = grid[0].length - 1
var ym = grid.length - 1

// var sums = []
// function step(sum, x, y){
//   sum += grid[y][x]

//   if (x < xm){
//     step(sum, x + 1, y)
//   }
//   if (y < ym){
//     step(sum, x + 1, y)
//   }

//   if (x == xm && y == ym){
//     sums.push(sum)
//   }
// }

// step(0, 0, 0)


var minCosts = grid.map(d => d.map(d => 0))

grid.forEach((row, y) => {
  row.forEach((d, x) => {
    if (x == 0 && y == 0) return

    var top = y ? minCosts[y - 1][x] : NaN
    var left = x ? minCosts[y][x - 1] : NaN

    minCosts[y][x] = d + d3.min([top, left])
  })
})

log(_.last(_.last(minCosts)))



// var PF = require('pathfinding');

// var grid = new PF.Grid(grid)


// var finder = new PF.AStarFinder();

// var path = finder.findPath(0, 0, grid.width - 1, grid.height -1, grid);


// log(path)