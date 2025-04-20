// var x = 5
// var obj={
//     x :5
// }

// function add(x,y){
//     return x+y
// }

// function myfun(x,y,z)
//     {
//         var sum = add(x,y)
//         return add(sum,z)
//     }
// var obj={
//     x :5,
//     test:add,
//     fun:myfun
// }
(function(param){
    var obj = {
        x :5,
        fun:myfun

    }

    function add(x,y){
        return x+y
    }

    function myfun(x,y,z)
    {
        var sum = add(x,y)
        return add(sum,z)
    }

    param.lib2Obj = obj
})(window)


// $