var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')
d3.nestBy = jp.nestBy

function log(...args){ console.log.apply(null, args) }

var str = 'target area: x=20..30, y=-10..-5'
var str = 'target area: x=156..202, y=-110..-69'

var t = [[20, -10], [30, -5]]
var t = [[156, -110], [202, -69]]


var hit = []
var dyVals = d3.range(1, 1000).map(dy => {
  var canHit = d3.range(1, 202).every(dx => {
    // log(dx, dy)
    var traj = calcTraj(dx, dy)

    if (traj.canHit) hit.push(traj)
    return traj.canHit
  })

  return {dy, canHit}
})

// log(dyVals)

// log(calcTraj(6, 9))

function calcTraj(dx, dy){
  var canHit = false

  var x = 0
  var y = 0
  var traj = [[x, y]]

  // log(y >- t[1][1])
  while (x <= t[1][0] && y >= t[1][1]){
    x += dx
    y += dy

    dx -= Math.sign(dx)
    dy-- 

    traj.push([x, y])

    canHit = canHit || isInT(x, y)
  }

  // log(traj)

  return {canHit, traj}

}

function isInT(x, y){
  return t[0][0] <= x && x <= t[1][0] && t[0][1] <= y && y <= t[1][1]
}


// log(dyVals)


// var maxDy = dyVals.filter(d => d.canHit).slice(-1)[0].dy

// log(maxDy)

// maxTraj = calcTraj(0, maxDy)
// log(maxTraj)

// log(d3.max(calcTraj(0, maxDy).traj, d => d[1]))


// `

// S........#.....................
// .................#.............
// ...............................
// ........................#......

// `