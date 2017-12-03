var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

var str = fs.readFileSync('a.txt', 'utf8').trim()
var lines = str.split('\n')

var sum = 0
lines.forEach((d, i) => {

})

var visited = {}
var x = 0 
var y = 0

var i = 1
var dir = 0


// while (i < 325488){
//   visited[x + '-' + y] = i


//   var nx = getDx()
//   var ny = getDy()
//   if (visited[nx + '-' + ny]){
//     dir = (dir + 1) % 4

//   nx = getDx()
//   ny = getDy()
//   }

//   x = nx
//   y = ny
  
//   i++
// }

// console.log(x, y)


function getDx(){
  if (dir == 0) return x + 1
  if (dir == 2) return x - 1
  return x
}

function getDy(){
  if (dir == 1) return y - 1
  if (dir == 3) return y + 1
  return y
}


var n = 26 



// console.log(Math.sqrt(325489))

// console.log(570*570)

// console.log(325489 -324900)

// console.log(589- 285 - 285)

// console.log(589 - 19)

// console.log(325489- 569*569)

// console.log(325489- 569*569 - 569 - 569 - 569)

// console.log(569 + 569 -21)

function log(...args){ console.log.apply(null, args) }

var n = 24
var n = 325489

var lr = Math.floor(Math.sqrt(n))
if (lr % 2 == 0) lr--
log(lr)

var steps = n - lr*lr
log(steps)

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
  log('dy', dy, steps)

  y = y - dy
  steps = steps - dy
} 

// left
if (steps){
  var dx = Math.min(lr + 1, steps)
  log('dx', dx)
  x = x - dx
  steps = steps - dx
} 

// down
if (steps){
  var dy = Math.min(lr + 1, steps)
  log('dy', dy)
  y = y + dy
  steps = steps - dy
} 

// right
if (steps){
  var dx = Math.min(lr + 1, steps)
  log('dx', dx)
  x = x + dx
  steps = steps - dx
} 

// // left
// if (steps > lr){
//   steps = sters - lr - 1
//   dist = dist + 1
// } 
// // down
// if (steps > lr){
//   steps = sters - lr - 1
//   dist = dist + 1
// } 
// // right
// if (steps > lr){
//   steps = sters - lr - 1
//   dist = dist + 1
// } 

log(x, y, steps)








