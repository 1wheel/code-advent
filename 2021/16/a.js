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

var bin = parseHex('38006F45291200')
var bin = parseHex('EE00D40C823060')

var bin = parseHex('8A004A801A8002F478')
var bin = parseHex('620080001611562C8802118E34')
var bin = parseHex('C0015000016115A2E0802F182340')
var bin = parseHex('A0016C880162017C3686B18A3D4780')
var bin = parseHex('220D790065B2745FF004672D99A34E5B33439D96CEC80373C0068663101A98C406A5E7395DC1804678BF25A4093BFBDB886CA6E11FDE6D93D16A100325E5597A118F6640600ACF7274E6A5829B00526C167F9C089F15973C4002AA4B22E800FDCFD72B9351359601300424B8C9A00BCBC8EE069802D2D0B945002AB2D7D583E3F00016B05E0E9802BA00B4F29CD4E961491CCB44C6008E80273C393C333F92020134B003530004221347F83A200D47F89913A66FB6620016E24A007853BE5E944297AB64E66D6669FCEA0112AE06009CAA57006A0200EC258FB0440010A8A716A321009DE200D44C8E31F00010887B146188803317A3FC5F30056C0150004321244E88C000874468A91D2291802B25EB875802B28D13550030056C0169FB5B7ECE2C6B2EF3296D6FD5F54858015B8D730BB24E32569049009BF801980803B05A3B41F1007625C1C821256D7C848025DE0040E5016717247E18001BAC37930E9FA6AE3B358B5D4A7A6EA200D4E463EA364EDE9F852FF1B9C8731869300BE684649F6446E584E61DE61CD4021998DB4C334E72B78BA49C126722B4E009C6295F879002093EF32A64C018ECDFAF605989D4BA7B396D9B0C200C9F0017C98C72FD2C8932B7EE0EA6ADB0F1006C8010E89B15A2A90021713610C202004263E46D82AC06498017C6E007901542C04F9A0128880449A8014403AA38014C030B08012C0269A8018E007A801620058003C64009810010722EC8010ECFFF9AAC32373F6583007A48CA587E55367227A40118C2AC004AE79FE77E28C007F4E42500D10096779D728EB1066B57F698C802139708B004A5C5E5C44C01698D490E800B584F09C8049593A6C66C017100721647E8E0200CC6985F11E634EA6008CB207002593785497652008065992443E7872714')
// var bin = parseHex('D2FE28')

var versionSum = 0

function parsePacket(bin, i){
  if (bin.length - i < 6){
    log({versionSum})
    throw 'up'
  }

  var version = parseInt(bin.slice(i, i + 3), 2)
  var typeId = parseInt(bin.slice(i + 3, i + 6), 2)
  var rest = bin.slice(i + 6)

  log({version, typeId, i, rest})

  var count = i + 6

  versionSum += version

  if (typeId == 4){
    var fives = d3.nestBy(rest.split('').map((d, i) => ({d, i})), d => Math.floor(d.i/5))
      .map(d => d.map(d => d.d).join(''))
    
    var tmp = ''
    var fivesCount = 0
    for (d of fives){
      tmp = tmp + d.slice(1)
      fivesCount += 5
      if (d[0] == '0') break
    }
    count += fivesCount
    var num = parseInt(tmp, 2)
    log({num, count})

    return count
  } else {
    var lengthTypeId = rest[0]
    rest = rest.slice(1)
    count += 1

    if (lengthTypeId == 0){
      count += 15
      var maxBits = parseInt(rest.slice(0, 15), 2) + count

      while (count < maxBits){
        count = parsePacket(bin, count)
      }

    } else {
      var maxPackets = parseInt(rest.slice(0, 11), 2)
      count += 11

      while(maxPackets--){
        count = parsePacket(bin, count)
      }
    }

  }

  return count
}
count = parsePacket(bin, 0)

log({versionSum})