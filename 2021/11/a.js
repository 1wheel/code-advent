var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

function log(...args){ console.log.apply(null, args) }

var str = fs.readFileSync('b.txt', 'utf8')
var lines = str.split('\n')

log(str)

grid = lines.map(d => d.split('').map(v => ({v: +v})))




grid.forEach((line, i) => {
  line.forEach((d, j) => {
    d.i = i
    d.j = j
  })
})

var flat = _.flatten(grid)

flat.forEach(d => {
  d.ns = flat.filter(e => Math.abs(d.i - e.i) < 2 && Math.abs(d.j - e.j)  < 2 && d != e)
})


var steps = d3.range(10).map(step => {
  var flashes = 0
  flat.forEach(d => {
    d.v++
    d.flashed = 0
  })

  filterFn = d => d.v > 9 && !d.flashed
  count = 0
  while (flat.filter(filterFn).length > 0 && count < 1000000){
    count++
    // log(flat.filter(filterFn).length)
    flat.filter(filterFn).forEach(d => {
      // log(d)
      flashes++
      d.flashed = 1
      d.ns.forEach(d => d.v++)
    })
  }


  flat.filter(d => d.flashed).forEach(d => {
    d.v = 0
  })

  log({step})
  log(grid.map(d => d.map(d => d.v).join('')).join('\n'))
  log('\n')
  return flashes
})


log(steps)
log(d3.sum(steps))