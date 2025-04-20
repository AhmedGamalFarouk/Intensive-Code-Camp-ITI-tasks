function reverse1(args) {
    var reversed1 = [].reverse.call(args);
    return reversed1;
}

function reverse2(args) {
    var reversed2 = [].reverse.apply(args);
    return reversed2;
}