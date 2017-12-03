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

  nums.forEach(d => {
    nums.forEach(e => {
      var div = d/e
      if (e == d) return
      if (Math.round(div) != div) return 
      console.log(d, e, div)

      sum += div
    })

  })

})

console.log(sum)