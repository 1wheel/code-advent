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
scores = lines.map(line => {
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
        return NaN
      }
    }
  }

  var t = 0
  closeList.reverse().forEach(d => {
    t = t*5
    t = t + ' )]}>'.indexOf(d)
  })

  return t
})


log(d3.median(scores))