/**borrowing function */
var arr = [1,2,3,4,5,6]
console.log(arr.join())//'1,2,3,4,5,6'
console.log(arr.join('_'))

var str = 'this is javascript'
// console.log(str.join())

/**
 * call
 * apply
 * bind
 */

// console.log([].join)
console.log([].join.apply(str,['**']))
console.log([].join.apply(str))

//call
console.log([].join.call(str,'--'))

//bind
var fun = [].join.bind(str,'_')

console.log(arr.reverse())

console.log([].reverse.call(str.split('')))
str.split('').reverse()