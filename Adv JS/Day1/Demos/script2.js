/**
 * 
 * arr=[f1,f2,f3]
 * i=0/1/2/3
 * anonymous1--->i=0---->f1
 * anonymous2--->i=1---->f2
 * anonymous3--->i=2---->f3
 */

//closure problem
function outerfun(){
    var arr=[]
    for(var i=0;i<3;i++){
        arr.push((function(j)
        {
            // var j = i
            return function(){
                console.log(j)
            }
        })(i))
    }
    return arr
}

var result = outerfun()//[f,f,f]
result[0]()//0-undefined-2-3
result[1]()//1-undefined-2-3
result[2]()//2-undefined-2-3