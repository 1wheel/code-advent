var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

var str = fs.readFileSync('a.txt', 'utf8').trim()
var lines = str.split('\n')//.map(d => +d)


log(lines)

var registers = {}

var max = -1 
lines.forEach(line => {
  var [reg, command, val, iff, reg2, comp, val2] = line.split(' ')
  val  = +val
  val2 = +val2


  if (!registers[reg]) registers[reg] = 0
  if (!registers[reg2]) registers[reg2] = 0


  if (eval(`${registers[reg2]} ${comp} ${val2}`)){
    registers[reg] += val*(command == 'inc' ? 1 : -1)
  }
  // log(val)

  max = Math.max(max, d3.max(d3.values(registers)))

})


log(d3.max(d3.values(registers)))
log(max)



function log(...args){ console.log.apply(null, args) }
