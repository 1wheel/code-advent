var fs = require ('fs')
var _ = require('underscore')
var d3 = require('d3')
var jp = require('d3-jetpack')
d3.nestBy = jp.nestBy

function log(...args){ console.log.apply(null, args) }

var str = fs.readFileSync('test.txt', 'utf8')
var str = fs.readFileSync('actual.txt', 'utf8')

var lines = str.split('\n')
