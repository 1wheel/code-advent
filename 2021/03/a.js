var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

var str = fs.readFileSync('a.txt', 'utf8')

var n = 12
var indices = d3.range(n).map(d => [])
var lines = str.split('\n')
  .map(d => {
    d.split('').forEach((d, i) => {
      indices[i].push(d)
    })
  })


var g = indices.map(d => d3.median(d))
var e = g.map(d => !d)
console.log(bin2num(g)*bin2num(e))

function bin2num(bin){
  return d3.sum(bin.reverse(), (d, i) => d*Math.pow(2, i))
}


