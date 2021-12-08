var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')

function log(...args){ console.log.apply(null, args) }

var str = fs.readFileSync('a.txt', 'utf8')
var lines = str.split('\n')


str = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'

// lines = [str]

var outputs = lines
  .map(l => {
    var nums = l
      .split(' ')
      .filter(d => d != '|')
      .map(d => d.split('').sort().join(''))

    var nums = _.sortBy(_.uniq(nums), d => d.length)

    // diff between 1 and 7
    var a = diff(nums[1], nums[0])

    var cde = nums
      .filter(d => d.length == 6)
      .map(d => diff(nums[9], d))
      .join('')

    var bd = diff(nums[2], nums[0])
    var cf = diff(nums[2], bd)

    var b = diff(bd, cde)
    var f = diff(cf, cde)
    var c = diff(cf, f)

    var d = diff(bd, b)
    var e = diff(cde, c + d)
    var f = diff(cf, c)
    var g = diff(nums[9], a + b + c + d + e + f)

    var O = l.split('|')[1].split(' ').filter(d => d).map(letters => {
      letters = letters.split('').sort().join('')
      console.log(letters)
      var outputLetters =  [
        [a, b, c, e, f, g],
        [c, f],
        [a, c, d, e, g],
        [a, c, d, f, g],
        [b, c, d, f],
        [a, b, d, f, g],
        [a, b, d, e, f, g],
        [a, c, f],
        [a, b, c, d, e, f, g],
        [a, b, c, d, f, g],
      ].map(d => d.sort().join(''))

      // console.log(outputLetters)

      return outputLetters.indexOf(letters)
    })

    console.log(O)

    return O[0]*1000 + O[1]*100 + O[2]*10 + O[3]*1
  })

log(d3.sum(outputs))


function diff(a, b){
  return a.split('').filter(char => !b.includes(char)).join('')
}

`

  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg
`