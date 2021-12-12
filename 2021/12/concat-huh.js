var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

function log(...args){ console.log.apply(null, args) }

var str = fs.readFileSync('test.txt', 'utf8')
// var str = fs.readFileSync('actual.txt', 'utf8')
var lines = str.split('\n')

var nodes = {}

lines.forEach(d => {
  var [a, b] = d.split('-')

  if (!nodes[a]) nodes[a] = []
  if (!nodes[b]) nodes[b] = []

  nodes[a].key = a
  nodes[a].push(nodes[b])

  nodes[b].key = b
  nodes[b].push(nodes[a])
})

d3.values(nodes).forEach(d => {
  d.isLower = d.key.toLowerCase() == d.key
})

var paths = []
var lowerVisits = []

count = 0
function addToChain(chain){
  count++
  if (count > 2) throw 'up'
  log('\n')
  log(chain.map(d => d.key))
  // log(_.last(chain))

  if (_.last(chain).key == 'end') return paths.push(chain)

  _.last(chain)
    .filter(d => !d.isLower || !chain.includes(d))
    .forEach(d => {
      addToChain(chain.concat(d))
    })
}

addToChain([nodes['start']])

log(paths.length)