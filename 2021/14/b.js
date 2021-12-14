var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

function log(...args){ console.log.apply(null, args) }

var str = fs.readFileSync('test.txt', 'utf8')
var str = fs.readFileSync('actual.txt', 'utf8')

var lines = str.split('\n')

letters = _.uniq(str.split(' '))

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


letters = str
rules.forEach(d => {
  letters = letters + rules.join('').replaceAll(',', '')
})

letters = _.uniq(letters)
letters.push('z')

var pairs = d3.cross(letters, letters)
pairObj = {}
pairs.forEach(d => {
  var str = d.join('')
  array = []

  pairObj[str] = array

  out = manualStep(d)
  pairObj[str] = {update: out, count: 0}
})


log(pairObj)

function manualStep(str){
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

  return str
}


str.split('').forEach((d, i) => {
  var p = str[i + 1] || 'z'
  pairObj[d + p].count++
})

log(pairObj)

function step(){
  var nObj = JSON.parse(JSON.stringify(pairObj))

  d3.entries(pairObj).forEach(({key, value}) => {
    var {update, count} = value

    if (update.length == 3){
      var [a, b, c] = update
      nObj[key].count -= count
      nObj[a + b].count += count
      nObj[b + c].count += count
    }
  })

  pairObj = nObj
}

d3.range(40).forEach(step)
pairs = d3.entries(pairObj)

byc = jp.nestBy(pairs, d => d.key[0]).map(d => d3.sum(d, d => d.value.count))

byc = _.sortBy(byc)

log(byc[1] - _.last(byc))

log(byc[0])
