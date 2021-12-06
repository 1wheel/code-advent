var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

var str = fs.readFileSync('a.txt', 'utf8')

var n = 12
var indices = d3.range(n).map(d => [])
var lines = str.split('\n')
  .map(d => {
    return d.split('').map(d => +d)
  })


var o = lines.slice()
var c = lines.slice()

function incO(index){
  var vs = o.map(d => d[index])
  var common = d3.median(vs)
  // if (common != 1 && common != 0) console.log(common)
  if (common == .5) common = 1

  o = o.filter(d => d[index] == common)
} 

function incC(index){
  var vs = o.map(d => d[index])
  var common = d3.median(vs)
  if (common == .5) common = 0

  console.log({common: +!common, index})

  if (c.length == 1) return
  c = c.filter(d => d[index] == +!common)

  console.log(c.slice(0, 3).map(d => d.join('')))
} 

d3.range(n).forEach(incO)
d3.range(n).forEach(incC)
console.log(c)

oNum = bin2num(o[0])
cNum = bin2num(c[0])


console.log(cNum*oNum)

function bin2num(bin){
  return d3.sum(bin.slice().reverse(), (d, i) => d*Math.pow(2, i))
}
console.log({oNum, cNum})
