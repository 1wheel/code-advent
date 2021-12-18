var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')
d3.nestBy = jp.nestBy

function log(...args){ console.log.apply(null, args) }


var str = fs.readFileSync('actual.txt', 'utf8')
var str = fs.readFileSync('test.txt', 'utf8')



var lines = str.split('\n')

hex2bin = {}
var hex = `0 = 0000
1 = 0001
2 = 0010
3 = 0011
4 = 0100
5 = 0101
6 = 0110
7 = 0111
8 = 1000
9 = 1001
A = 1010
B = 1011
C = 1100
D = 1101
E = 1110
F = 1111`.split('\n').forEach(d => {
  [a, b] = d.split(' = ')
  hex2bin[a] = b
})

function parseHex(d){
  return d.split('').map(d => hex2bin[d]).join('')
}
var bin = parseHex('D2FE28')

var bin = parseHex('38006F45291200')
log(bin)

function parsePacket(bin){
  var version = parseInt(bin.slice(0, 3), 2)
  var typeId = parseInt(bin.slice(3, 6), 2)
  var rest = bin.slice(6)

  if (typeId == 4){
    var fives = d3.nestBy(rest.split('').map((d, i) => ({d, i})), d => Math.floor(d.i/5))
      .map(d => d.map(d => d.d).join(''))
    
    var tmp = ''
    for (d of fives){
      tmp = tmp + d.slice(1)
      if (d[0] == '0') break
    }
    var num = parseInt(tmp, 2)
  } else {
    var lengthTypeId = rest[0]
    rest = rest.slice(1)

    if (lengthTypeId )

  }

  log({version, typeId, lengthTypeId, rest})
}
parsePacket(bin)