// lab1:
//? -----------
// 1- Create an interface User with properties name (string) and age (number). and it is required not optional
//    required create an object with only the name property.

interface User {
    name: string
    age: number;
}
type PartialUser = Partial<User>;

const user: PartialUser = { name: 'Ahmed' };

//! ----------------------------------------------------------------------------------------------------------------------------------------------------------

// 2- Create an interface Profile with optional properties username (string) and email (string).
//    required create an object with both properties.

interface Profile {
    username?: string
    email?: string;
}

let profile1 :Required <Profile> =  {
    username: 'Ahmed',
    email: 'email@company.com',
}
//! ----------------------------------------------------------------------------------------------------------------------------------------------------------
// 3- Use Record to create an object where keys are "red", "green", and "blue", and values are their corresponding hex color codes (strings).
//    Test by accessing the red key.
type Colors = Record<'red' | 'green' | 'blue', string>;

const colors: Colors = {
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
}
console.log(colors.red);
//! ----------------------------------------------------------------------------------------------------------------------------------------------------------
// 4- Create an interface Person with properties name (string), age (number), and email (string).
//    create a new type with only the name and email properties.
//    Test by creating an object with these properties.
interface Person {
    name: string;
    age: number;
    email: string;
}
type PersonNameEmail = Pick<Person, 'name' | 'email'>;
const person1: PersonNameEmail = {
    name: 'sh3bola',
    email: 'sh3bola@example.com',
};
console.log(person1);
//! ----------------------------------------------------------------------------------------------------------------------------------------------------------
// 5- Use the same Person interface from the previous question.
//    create a new type without the age property.
//    Test by creating an object with only name and email.


type PersonWithoutAge = Omit<Person, 'age'>;

const person2: PersonWithoutAge = {
    name: 'Jane Doe',
    email: 'jane@example.com'
};

console.log(person2);
//! ----------------------------------------------------------------------------------------------------------------------------------------------------------
// 6- Create a union type Colors = "red" | "green" | "blue" | "yellow".
//   create a new type without "yellow".
//   Test by assigning a value of the new type.

type ColorsUnion = "red" | "green" | "blue" | "yellow";
type ColorsWithoutYellow = Exclude<ColorsUnion, "yellow">;
let a: ColorsWithoutYellow = "red";
let b: ColorsWithoutYellow = "yellow";

//! ----------------------------------------------------------------------------------------------------------------------------------------------------------
// 7- Use the same Colors union type from the previous question.
//    create a new type with only "red" and "blue".
//    Test by assigning a value of the new type.
type ColorsWithRedBlue = Extract<ColorsUnion, "red" | "blue">;

let c: ColorsWithRedBlue = "red";
let d: ColorsWithRedBlue = "blue";
//! ----------------------------------------------------------------------------------------------------------------------------------------------------------
// 8- Create a union type MaybeString = string | null | undefined.
//    create a new type without null or undefined.
//    Test by assigning a value of the new type.

type MaybeString = string | null | undefined;
type stringWithoutNullUndefined = NonNullable<MaybeString>;

let e: stringWithoutNullUndefined = "Hello";
let f: stringWithoutNullUndefined = null;
let g: stringWithoutNullUndefined = undefined;
// ----------------------------------------------------------------------------------------------------------------------------------------------------------
