//! A.3. Create an adding function that adds n numbers only.
//! Throw exception if the user passed any data type other than
//! “number” or called your function without passing any parameters.


function add() {
    if (arguments.length === 0) {
        throw new Error('Function requires at least one parameter');
    }

    for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] !== 'number') {
            throw new Error('All arguments must be numbers');
        }
    }

    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }

    return sum;
}