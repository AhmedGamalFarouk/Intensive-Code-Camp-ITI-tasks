
//! make this function that accepts only 2 parameters and throw

//! exception if number of parameters either less than or exceeds 2 parameters

function multiply(a, b) {
    if (arguments.length !== 2) {
        throw new Error('Function requires exactly 2 parameters');
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }

    return a * b;
}


