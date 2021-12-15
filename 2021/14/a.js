var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

function log(...args){ console.log.apply(null, args) }

var str = fs.readFileSync('test.txt', 'utf8')
var str = fs.readFileSync('actual.txt', 'utf8')

var lines = str.split('\n')


var rules = []
var isRule = false
var str = null

lines.forEach(d => {
  if (!d) return

  if (!str){
    str = d
  } else{
    rules.push(d.split(' -> '))
  }
})

str = str.split('')

function step(){
  ns = []
  str.forEach((d, i) => {
    var p = str[i + 1] || ''

    ns.push(d)

    rules.forEach(r => {
      if (r[0] == d + p){
        ns.push(r[1])
      }
    })
  })

  str = ns
}

d3.range(10).forEach(step)




// log(str.join(''))

byc = jp.nestBy(str, d => d).map(d => d.length)

byc = _.sortBy(byc)

log(byc[0] - _.last(byc))
