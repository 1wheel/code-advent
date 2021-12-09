var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

function log(...args){ console.log.apply(null, args) }

var str = fs.readFileSync('a.txt', 'utf8')
var lines = str.split('\n')

grid = lines.map(d => d.split('').map(d => +d))
console.log(grid)

var lowPoints = 0
grid.forEach((row, i) => {
  row.forEach((d, j) => {
    var ns = [
      i < grid.length -1 ? grid[i + 1][j] : 99, 
      i > 0 ? grid[i - 1][j] : 99, 
      grid[i][j + 1], 
      grid[i][j - 1], 
    ].filter(e => isFinite(e))

    if (ns.every(e => e > d)) lowPoints += d + 1
  })
})

log(lowPoints)