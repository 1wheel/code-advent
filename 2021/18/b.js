var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')
d3.nestBy = jp.nestBy

function log(...args){ console.log.apply(null, args) }

// var str = 'target area: x=20..30, y=-10..-5'
// var str = 'target area: x=156..202, y=-110..-69'

var t = [[20, -10], [30, -5]]
var t = [[156, -110], [202, -69]]


var hit = 0
var dyVals = d3.range(-110, 20000).map(dy => {
  log({dy, hit})
  var canHit = d3.range(1, 203).map(dx => {
    var traj = calcTraj(dx, dy)

    if (traj.canHit) hit++
  })

  return {dy, canHit}
})


function calcTraj(dx, dy){
  var x = 0
  var y = 0
  var rv = {dx, dy, canHit: false, traj: [[x, y]]}

  // log(y >- t[1][1])
  while (x <= t[1][0] && y >= t[0][1]){
    x += dx
    y += dy

    dx -= Math.sign(dx)
    dy-- 

    rv.traj.push([x, y])

    rv.canHit = rv.canHit || isInT(x, y)
  }
  // log(x, t[1][0], x <= t[1][0])
  // log(y, t[1][1], y >= t[1][1])

  // log(traj)
  return rv

}

function isInT(x, y){
  return t[0][0] <= x && x <= t[1][0] && t[0][1] <= y && y <= t[1][1]
}


maxTraj = calcTraj(6, 0)
log(maxTraj)


log('hits: ' + hit)
// log(hit.map(d => [d.dx, d.dy]).sort().join('\n'))



var correct = `23,-10  25,-9   27,-5   29,-6   22,-6   21,-7   9,0     27,-7   24,-5
25,-7   26,-6   25,-5   6,8     11,-2   20,-5   29,-10  6,3     28,-7
8,0     30,-6   29,-8   20,-10  6,7     6,4     6,1     14,-4   21,-6
26,-10  7,-1    7,7     8,-1    21,-9   6,2     20,-7   30,-10  14,-3
20,-8   13,-2   7,3     28,-8   29,-9   15,-3   22,-5   26,-8   25,-8
25,-6   15,-4   9,-2    15,-2   12,-2   28,-9   12,-3   24,-6   23,-7
25,-10  7,8     11,-3   26,-7   7,1     23,-9   6,0     22,-10  27,-6
8,1     22,-8   13,-4   7,6     28,-6   11,-4   12,-4   26,-9   7,4
24,-10  23,-8   30,-8   7,0     9,-1    10,-1   26,-5   22,-9   6,5
7,5     23,-6   28,-10  10,-2   11,-1   20,-9   14,-2   29,-7   13,-3
23,-5   24,-8   27,-9   30,-7   28,-5   21,-10  7,9     6,6     21,-5
27,-10  7,2     30,-9   21,-8   22,-7   24,-9   20,-6   6,9     29,-5
8,-2    27,-8   30,-5   24,-7`.split(' ').filter(d => d).sort()
// log(correct.join('\n'))

// `

// S........#.....................
// .................#.............
// ...............................
// ........................#......

// `