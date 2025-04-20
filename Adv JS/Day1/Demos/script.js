// console.log(x)//
// console.log(obj.x)
console.log(lib1Obj.x)

function add(){
    return 'hello'
}
// console.log(lib2Obj.x)
/**
 * categories of Object 4-Main
 * Built-in Objects
 *  String
 *  Array
 *  Date
 *  Number
 *  Boolean
 *  Math
 *  Regexp
 *  Error
 *  Event
 *  Object
 *  Function
 * BOM
 *  Window
 *      Location
 *      History
 *      Navigator
 *      Document
 *      Screen
 * DOM---->Document---standard functions
 *  DOM is subset BOM
 * custom Object
 */


/**object Object */
//literal way

// //shared function
// function fun(){
//     return this.propName
// }
// var propName = "Ahmed"
// var obj = {
//     propName:"obj",
//     propData:"xyz",
//     display:function(){
//         return this.propName
//     },
//     myfun:fun
// }

// console.log(fun())//Ahmed
// console.log(obj.myfun())//"obj"
// obj.address = "123st"
// console.log(obj)
// obj.propName = "newValue"
// console.log(obj)
// delete obj.propData
// console.log(obj)
// console.log(obj.propData)//undefined

// //iterate enumerable keys
// for(var elem in obj){
//     console.log(elem)
// }

// console.log(obj.propName)
// console.log(obj['propName'])

// var x = 'propName'
// console.log(obj.x)//undefined
// console.log(obj[x])

// //constructor way
// var myObj = new Object()
// myObj.test = "new Obj"

// console.log(obj.display())

// console.log(obj.hasOwnProperty('propName'))
// console.log(obj.hasOwnProperty('prop'))

// console.log(Object.keys(obj))//[]
// console.log(Object.values(obj))//[]
// console.log(Object.entries(obj))//[]

// console.log(obj.toString())
// console.log(obj.test)//undefined
// // console.log(obj.test())//Error

/**Function Object */

// console.log(add(1,2))//3
// //function statement
// function add(a,b){
//     return a + b
// }

// // console.log(myfun(1,2))
// //assign to variable
// //anonymous function
// var myfun = function msg(x,y){
//     console.log(arguments)
//     console.log(arguments.callee)
//     console.log(this)
//     console.log(myfun.caller)
//     return x + y
// }
// console.log(myfun(1,2))

//callback fn/anonymous function
// setTimeout(function(){
//     alert('hello')
// },2000)

// //assign fn to array
// var arr = [function(){
//     console.log('hello')
// }]
// arr[0]()

// function newfun(){
//     console.log('newfun')
//     myfun(1,2)
// }

// newfun()

//closure
// function outerfun(x,y,z){
//     function innerfun(a,b){
//         console.log(x)
//         console.log(y)
//         return x+y+z+a+b
//     }

//     return innerfun
// }

// var result = outerfun(1,2,3)//innerfun
//  var xyz = outerfun(5,6,7)(1,2)
// // console.log(result)
// var data = result(1,2)//

// var h =1
// // w=2
// function outerfun(x,y){
//      var w = 2
//     function innerfun(a,b){/**a=1
//         b=1
//         h=5 */
//         var h = 5//shadwing
//         // var w = 2
//         // console.log(innerfun.caller)//XXXXX
//         return x+y+a+b+window.h+w+h
//     }

//     return innerfun
// }

// var result = outerfun(1,2)//innerfun
// console.log(result(1,2))//

//self-invoke funtion
// IIFE
// ;(function(){
//     var x = 10
//     var y = 1
//     var sum = x+y
//     return 'hello ,'+sum
// })()











