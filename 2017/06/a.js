var _ = require('underscore')
var fs = require ('fs')
var d3 = require('d3')
var jp = require('d3-jetpack')

var str = fs.readFileSync('a.txt', 'utf8').trim()

var banks = str.split(' ').filter(d => d).map(d => +d)


var prevBanks = {}

var count = 0
while (!prevBanks[banks]){
  prevBanks[banks] = count

  var max = d3.max(banks)

  mI = -1
  for (var i = 0; i < banks.length; i++){
    if (max == banks[i] && mI == -1) mI = i
  }

  log(count, mI, max, banks)

  var v = max
  banks[mI] = 0

  while (v > 0){
    v--
    mI = (mI + 1) % banks.length

    banks[mI]++
  }
  
  count++
}

log(banks, count, prevBanks[banks], count - prevBanks[banks])




function log(...args){ console.log.apply(null, args) }
