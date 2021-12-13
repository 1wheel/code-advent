var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

function log(...args){ console.log.apply(null, args) }

var str = fs.readFileSync('test.txt', 'utf8')
var str = fs.readFileSync('actual.txt', 'utf8')
var lines = str.split('\n')


var points = []
var folds = []

var isFolds = false

lines.forEach(d => {
  if (isFolds){
    [dir, foldV] = d.replace('fold along ', '').split('=')
    folds.push({dir, foldV})
  } else if (d){
    points.push(d.split(',').map(d => +d))
  }

  if (!d) isFolds = true
})

log(points)
log(folds)

function addFold({dir, foldV}){
  op = points
  points = []

  var maxX = d3.max(op, d => d[0])
  var maxY = d3.max(op, d => d[1])

  if (dir == 'x'){
    op.forEach(([x, y]) => {
      var dif = x - foldV
      if (dif > 0) x = x - dif*2
      points.push([x, y])
    })
  } else {
    op.forEach(([x, y]) => {
      var dif = y - foldV
      orgY = y
      if (dif > 0) y = y - dif*2
      log({x, y, orgY})
      points.push([x, y])
    })
  }
}

addFold(folds[0])

log(_.uniq(points.map(d => d.join(','))).length)

pts = _.uniq(points.map(d => d.join(',')))

yv = jp.nestBy(pts, d => d.split(',')[1])
log(yv.filter(d => d.key == 0))

folds.forEach(addFold)
