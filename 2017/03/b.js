var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')


var visited = {'0:0': 1}

var max = 325489
// var max = 4
var n = 1
var lastVal = 0
while (lastVal <= max){
  n++

  var [x, y] = getXY(n)

  lastVal = d3.sum([
    getVal(x + 1, y + 1),
    getVal(x + 1, y + 0),
    getVal(x + 1, y - 1),

    getVal(x + 0, y + 1),
    getVal(x + 0, y - 1),

    getVal(x - 1, y + 1),
    getVal(x - 1, y + 0),
    getVal(x - 1, y - 1),
  ])

  visited[x + ':' + y]= lastVal

  // log(n, lastVal, x, y)
  log(n, lastVal, max, lastVal <= max)
}

console.log(n, max)

log(n - 1)


function getVal(x, y){
  return visited[x + ':' + y] || 0
}


function getXY(n){
  var lr = Math.floor(Math.sqrt(n))
  if (lr % 2 == 0) lr--

  var steps = n - lr*lr

  var x = lr/2 - .5
  var y = lr/2 - .5

  // right
  if (steps){
    x = x + 1
    steps = steps - 1
  }

  // up
  if (steps){
    var dy = Math.min(lr, steps)

    y = y - dy
    steps = steps - dy
  } 

  // left
  if (steps){
    var dx = Math.min(lr + 1, steps)
    x = x - dx
    steps = steps - dx
  } 

  // down
  if (steps){
    var dy = Math.min(lr + 1, steps)
    y = y + dy
    steps = steps - dy
  } 

  // right
  if (steps){
    var dx = Math.min(lr + 1, steps)
    x = x + dx
    steps = steps - dx
  }

  return [x, y]
}




function log(...args){ console.log.apply(null, args) }






