var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

function log(...args){ console.log.apply(null, args) }

var str = fs.readFileSync('b.txt', 'utf8')
var lines = str.split('\n')





var obj = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}
errors = lines.map(line => {
  var closeList = []

  for (let d of line.split('')){
    var close = obj[d]

    if (close){
      closeList.push(close)
    } else {
      console.log(closeList)
      if (_.last(closeList) == d){
        closeList.pop()
      } else{
        return d
      }
    }
  }
})

score = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}


sum = d3.sum(errors, d => score[d])
log(sum)