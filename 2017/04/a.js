var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

var str = fs.readFileSync('a.txt', 'utf8').trim()
var lines = str.split('\n')




console.log(lines)
var sum = 0
var validLines = lines.filter(d => {
  var words = d.trim().split(' ')

  var byWord = jp.nestBy(words, d => d)

  return d3.max(byWord, d => d.length) == 1
})

console.log(lines.length, validLines.length)




function log(...args){ console.log.apply(null, args) }
