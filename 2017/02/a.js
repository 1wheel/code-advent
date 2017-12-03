var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

var str = fs.readFileSync('a.txt', 'utf8').trim()
var lines = str.split('\n')


console.log(lines)
var nums = str.split('')
var sum = 0
lines.forEach((d, i) => {
  var nums = d.split(' ').filter(d => d).map(d => +d)
  var max = +d3.max(nums)
  var min = +d3.min(nums)

  var diff = max - min
  sum = sum + diff
  console.log(max, min, diff)

})

console.log(sum)

console.log()