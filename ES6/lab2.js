// =============
// ES6 lab2 :-
// =============
// 1- Unique Values & Iteration (Set)
// => Create a Set with the values [1, 2, 3, 4, 5, 3, 2].
// => Check if 3 exists in the Set.
// => Remove 2 from the Set.
// => Convert the Set back to an array and print it.
// => Iterate over the Set using both forEach and for...of.

let numbers = new Set([1, 2, 3, 4, 5, 3, 2]);
console. log("numbers:", numbers);
console. log("3 exists in the Set:", numbers.has(3));
numbers.delete(2);
console.log("Set after removing 2:", numbers);
let numbersArray = Array.from(numbers);
console.log("Set as an array:", numbersArray);
console.log("for of loop:");
for (let number of numbers) {
    console.log(number);
}
console.log("for each loop:");
numbers.forEach(number => {
    console.log(number);
});


// !--------------------------------------------------------------------------------------------------

// 2- Student Scores (Map)
// => Create a Map with student scores:
// 	"Alice": 85
// 	"Bob": 90
// 	"Charlie": 78
// => Retrieve "Bob"'s score and print it.
// => Update "Charlie"'s score to 88.
// => Check if "David" exists in the Map.
// => Iterate over the Map using both forEach and for...of

let mapobj = new Map();
mapobj.set("Alice", 85);
mapobj.set("Bob", 90);
mapobj.set("Charlie", 78);
console.log("Bob's score:", mapobj.get("Bob"));
mapobj.set("Charlie", 88);
console.log("Charlie's score:", mapobj.get("Charlie"));
console.log("David exists in the Map:", mapobj.has("David"));
console.log("for of loop:");   
for (let [key, value] of mapobj) {
    console.log(`${key}: ${value}`);
}
console.log("for each loop:");
mapobj.forEach((elment) => console.log(elment));

//! --------------------------------------------------------------------------------------------------

// 3- Create a Map of country populations:
// 	"USA": 331 million
// 	"India": 1380 million
// 	"China": 1441 million
// => Convert the Map into a JavaScript object and print it.
// => Convert the object back to a Map.
// => Create a Set of country names from the Map keys.
// => Convert the Set back to an array.

function mapToObject(map) {
    let mapobj =  new Map();
    
    mapobj.set("USA", "331 million");
    mapobj.set("India", "1380 million");
    mapobj.set("China", "1441 million");
    let obj = Object.fromEntries(mapobj);
    console.log("Map to Object:", obj);
// !--------------------------------------------------------------------------------------------------

// 4- Create a class Employee with:
// => Properties id, salary, and department.
// => A constructor to initialize these properties.
// => A method getDetails that returns a string with all details.
// ==> Create a subclass Manager that:
// => Extends Employee.
// => Adds a property teamSize.
// => Overrides getDetails to include teamSize.
// => Finally, test the Manager class by:
// => Creating an instance with id = 1, salary = 5000, department = "Engineering", and teamSize = 10.
// => Printing the details using getDetails().
// => Modifying id after initialization and observing the result.
    
    class Employee {
        constructor(id, salary, department) {
            this.id = id;
            this.salary = salary;
            this.department = department;
        }
        
        getDetails() {
            return `ID: ${this.id}, Salary: ${this.salary}, Department: ${this.department}`;
        }
    }

    class Manager extends Employee {
        constructor(id, salary, department, teamSize) {
            super(id, salary, department);
            this.teamSize = teamSize;
        }
        
        getDetails() {
            return `${super.getDetails()}, Team Size: ${this.teamSize}`;
        }
    }
    const manager = new Manager(1, 5000, "Engineering", 10);
    console.log(manager.getDetails());
    manager.id = 2;
    console.log(manager.getDetails());
    console.log(manager.salary);
    }
//! --------------------------------------------------------------------------------------------------

// 5- Create a class Temperature with:
// => A property #celsius.
// => A getter celsius that returns #celsius.
// => A setter celsius that updates #celsius but throws an error if the value is below -273.15 (absolute zero).
// ==> Finally, test the class by:
// => Creating an instance with an initial temperature.
// => Retrieving the temperature using the getter.
// => Updating the temperature using the setter with a valid value.
// => Attempting to set a value below -273.15 and observing the error.

class Temperature {
    #celsius;
    constructor(celsius) {
        this.#celsius = celsius;
    }
    get celsius() {
        return this.#celsius;
    }
    set celsius(celsius) {
        if (celsius < -273.15) {
            throw new Error("Temperature cannot be below absolute zero");
        }
        this.#celsius = celsius;
    }
}
const temp = new Temperature(25);
console.log("first temperature:", temp.celsius);

console.log(temp.celsius(100));
temp.celsius = 100;

temp.celsius = -300;
console.log(temp.celsius); // This line will not be executed due to the error thrown in the setter
// !--------------------------------------------------------------------------------------------------

// 6- Create a class MathUtils
// => A static property PI set to 3.14.
// => A static method calculateCircumference that takes a radius and returns 2 * PI * radius.
// => Test the static method.

class MathUtils {
    static PI = 3.14;
    static calculateCircumference(radius) {
        return 2 * MathUtils.PI * radius;
    }
}
console.log("Circumference:", MathUtils.calculateCircumference(6));
// !---------------------------------------------------------------------------------------------------

// 7- I have string with duplicated character for example "abacbd" need to write function to return first unique character if exist

let str = "abacbd";

for (char of str) {
 let current = [...str].filter(c => c === char).length;
 if (current === 1) {
     console.log("first unique character:", char);
     break;
 }
}