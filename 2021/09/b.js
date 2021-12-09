var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

function log(...args){ console.log.apply(null, args) }

var str = fs.readFileSync('a.txt', 'utf8')
// var str = fs.readFileSync('b.txt', 'utf8')
var lines = str.split('\n')

grid = lines.map(d => d.split('').map(v => ({v: +v})))

grid.forEach((row, i) => {
  row.forEach((d, j) => {
    d.n = [
      i < grid.length -1 ? grid[i + 1][j] : null, 
      i > 0 ? grid[i - 1][j] : null, 
      grid[i][j + 1], 
      grid[i][j - 1], 
    ].filter(e => e)

    d.n = _.sortBy(d.n, d => d.v)

    if (d.n.every(e => e.v > d.v)) d.basin = i + '/' + j
  })
})


flat = _.flatten(grid).filter(d => d.v != 9)
var count = 0
while (count < 100 && flat.length){
  count++

  flat.forEach(d => {
      if (d.n[0].basin) d.basin = d.n[0].basin
    })
  flat = flat.filter(d => d.v != 9 && !d.basin)
}

_.flatten(grid).forEach(d => {
  if (d.v == 9) d.basin = '999'
})
byBasin = jp.nestBy(_.flatten(grid).filter(d => d.v != 9), d => d.basin).map(d => d.length)
byBasin = _.sortBy(byBasin).reverse()

log(byBasin[0]*byBasin[1]*byBasin[2])

bb = jp.nestBy(_.flatten(grid), d => d.basin)
bb.forEach(d => d.l = d.length)
// log(bb)


// log(grid.map(d => d.map(d => d.basin).join('     ')))
