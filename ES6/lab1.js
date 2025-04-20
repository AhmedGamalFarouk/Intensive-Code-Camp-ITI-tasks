// =============
// ES6 lab1 :-
// =============
// 1- Define an array of numbers (only let is allowed)
// => Sort them ascending then descending (using array sort method and Arrow functions)
// => Filter numbers larger than 50 (using array filter method and Arrow functions)
// => Display Max and Min Numbers (using math methods and spread operator)


let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

let ascending = arr.sort((a, b) => a - b);
console.log("Ascending Order:", ascending);
let descending = arr.sort((a, b) => b - a);
console.log("Descending Order:", descending);
let largerThan50 = arr.filter(num => num > 50);
console.log("Numbers larger than 50:", largerThan50);
let maxNum = Math.max(...arr);
console.log("Max Number:", maxNum);
let minNum = Math.min(...arr);
console.log("Min Number:", minNum);


//! --------------------------------------------------------------------------------------------------

// 2- Create a function that takes two arguments:
// => An operation (for example: "sum", "subtract", "multiply", or "divide").
// => Any number of numeric arguments (using the rest operator).
// => Based on the operation, calculate the result.
// => Return an object containing:
//    - The operation performed.
//    - The input numbers.
//    - The calculated result.
// => Display the returned object using a template literal to format its content.
// “result of sum operation for 3,1,6,3 is 13”

function calculate(operation, ...numbers) {

    let result;
    switch (operation) {
        case "sum":
            result = numbers.reduce((acc, num) => acc + num, 0);
            break;
        case "subtract":
            result = numbers.reduce((acc, num) => acc - num);
            break;
        case "multiply":
            result = numbers.reduce((acc, num) => acc * num, 1);
            break;
        case "divide":
            result = numbers.reduce((acc, num) => acc / num);
            break;

    }

    return {
        operation,
        numbers,
        result
    };
}

// !--------------------------------------------------------------------------------------------------

// 3- Create constant project anonymouse object after takeing properties names
// and values from user (using object literals )  // prompt
// Note: names are projectId , projectName ,duration and printData which
// console.log all project data

const projectId = prompt("Enter project ID:");
const projectName = prompt("Enter project Name:");
const duration = prompt("Enter project duration:");

const printData = () => {
    console.log(`Project ID: ${projectId}`);
    console.log(`Project Name: ${projectName}`);
    console.log(`Duration: ${duration}`);
}

//! --------------------------------------------------------------------------------------------------

// 4- Define two arrays of numbers using let.
// => Merge both arrays using the spread operator.
// => Remove duplicate numbers from the merged array.
// => Sort the resulting array in ascending order using Array.sort() with an arrow function.
// => Display the final array

let arr1 = [1, 2, 3, 4, 5];
let arr2 = [3, 4, 5, 6, 7];
let mergedArray = [...arr1, ...arr2];
let uniqueArray = [...new Set(mergedArray)];
let sortedArray = uniqueArray.sort((a, b) => a - b);
console.log(sortedArray);


// !--------------------------------------------------------------------------------------------------

// 5- Define an object that represents a user with nested properties (name, age, address(city , country), hobbies[array of something]).
// => Destructure the object to extract specific properties (e.g., name, age, city, country).
// => Display the extracted information using a template literal.

user = {
    name: "Ahmed",
    age: 24,
    address: {
        city: "Cairo",
        country: "Egypt"
    },
    hobbies: ["reading", "gaming", "coding"],
};

const { name, age, address: { city, country } } = user;

console.log(`Name: ${name}, Age: ${age}, City: ${city}, Country: ${country}`);
// --------------------------------------------------------------------------------------------------

