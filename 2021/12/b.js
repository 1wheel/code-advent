var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

function log(...args){ console.log.apply(null, args) }

var str = fs.readFileSync('test.txt', 'utf8')
var str = fs.readFileSync('actual.txt', 'utf8')
var lines = str.split('\n')


var nodes = {}

lines.forEach(d => {
  var [a, b] = d.split('-')

  if (!nodes[a]) nodes[a] = {key: a, n: []}
  if (!nodes[b]) nodes[b] = {key: b, n: []}

  nodes[a].key = a
  nodes[a].n.push(nodes[b])

  nodes[b].n.push(nodes[a])
})


d3.values(nodes).forEach(d => {
  d.isLower = d.key.toLowerCase() == d.key
  d.isTwice = d.isLower && d.key.length < 4
  d.isOnce = d.isLower && d.key.length > 4
})


var paths = []
var lowerVisits = []


count = 0
function addToChain(chain){
  count++
  // if (count > 2) throw 'up'
  // log('\n')
  // log(chain.map(d => d.key))
  // log(_.last(chain).n.map(d => d.key))

  if (_.last(chain).key == 'end') return paths.push(chain)

  _.last(chain).n
    .filter(d => {
      if (!d.isLower) return true
      var prev = chain.filter(e => e == d).length
      // log({prev, key: d.key})

      if (d.isOnce && prev < 1) return true
      var maxSmall = d3.max(
        jp.nestBy(chain.filter(d => d.isLower), d => d.key), 
        d => d.length)

      // log(maxSmall)

      if (maxSmall < 2){
        if (d.isTwice && prev < 2) return true
      } else {
        if (d.isTwice && prev < 1) return true
      }
    })
    .forEach(d => {
      addToChain(chain.concat([d]))
    })
}

addToChain([nodes['start']])

log(paths.length)

// log(paths.map(d => d.map(e => e.key).join(',')).join('\n'))