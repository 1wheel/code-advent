var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

var str = fs.readFileSync('a.txt', 'utf8')
var lines = str.split('\n')

var nums = str.split('')
var sum = 0
nums.forEach((d, i) => {
  if (!i) return
  if (d == nums[(i + nums.length/2) % nums.length]) sum = sum + + d
})

console.log(sum)