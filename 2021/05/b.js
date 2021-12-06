var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

var str = fs.readFileSync('a.txt', 'utf8')


var lines = str.split('\n')
  .map(d => {
    var [x0, y0] = d.split(' -> ')[0].split(',').map(d => +d)
    var [x1, y1] = d.split(' -> ')[1].split(',').map(d => +d)

    return {x0, y0, x1 ,y1}
  })


var grid = {}

lines.forEach(({x0, y0, x1 ,y1}) => {
  var signX = Math.sign(x1 - x0)
  var signY = Math.sign(y1 - y0)

  if (signY){
    d3.range(y0, y1 + sign, sign).forEach(y => {
      incCount(x0, y)
    })
  } else if (signX){
    d3.range(x0, x1 + sign, sign).forEach(x => {
      incCount(x, y0)
    })
  } else {
    d3.range(x0, x1 + sign, sign).forEach((x, i) => {
      incCount(x, y0 + i*signY)
    })

  }
})

function incCount(x, y){
  // console.log([x, y])
  var key = x + ' ' + y
  if (!grid[key]) grid[key] = 0
  grid[key]++
}

// console.log(grid)

var count = d3.sum(d3.values(grid), d => d > 1)

console.log(count)

