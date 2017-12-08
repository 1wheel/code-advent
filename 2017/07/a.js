var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

var str = fs.readFileSync('a.txt', 'utf8').trim()
var lines = str.split('\n')//.map(d => +d)


log(lines)

var i = 0
var steps = 0

var plates = lines.map(d => {
  var name = d.split(' ')[0]

  var above = d.includes('->') ? d.split('-> ')[1].split(', ') : []
  var dWeight = +d.split('(')[1].split(')')[0]

  var below = false

  return {name, above, below, dWeight}
})

var name2plate = _.indexBy(plates, d => d.name)


// console.log(name2plate)
plates.forEach(p => {
  p.above.forEach(d => {
    name2plate[d].below = p
  })

  p.above = p.above.map(d => name2plate[d])
})

var i = 0
while (i < 20){
  i++
  plates.forEach(p => {

    var tWeight = d3.sum(p.above, d => d.tWeight) + p.dWeight
    if (isNaN(tWeight)) return
    if (p.above.some(d => !d.tWeight)) return

    var meanWeight = d3.mean(p.above, d => d.tWeight)

    if (p.above.some(d => d.tWeight != meanWeight)){
      log(p.above.map(d => d.tWeight))
      // log(p.above[0].above.map(d => d.tWeight))

      log(p.above[0].dWeight)
      throw 'up'
    }

    p.tWeight = tWeight

  })

}


log(plates.filter(d => !d.below))



function log(...args){ console.log.apply(null, args) }
