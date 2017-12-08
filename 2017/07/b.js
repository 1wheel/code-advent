var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

var str = fs.readFileSync('a.txt', 'utf8').trim()
var lines = str.split('\n').map(d => +d)


console.log(lines)

var i = 0
var steps = 0


while (0 <= i < lines.length){
  var v = lines[i]

  if (isNaN(v)) throw steps


  v >= 3 ? lines[i]-- : lines[i]++
  // console.log(i, v, v )
  i += v

  steps++
}

console.log(i, steps)

function log(...args){ console.log.apply(null, args) }
