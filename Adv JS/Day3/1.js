// 1.a. Make proper updates in previous of generating Rectangle
// objects,
// • Rectangle Constructor should inherit from Shape
// Constructor
// • Create your Square constructor that inherits from
// Rectangle.
// • Create a Class Property that counts number of generated
// Square objects.
// • Prevent creating any object from shape, allow creation of
// only rectangles and square (make shape abstract class)
// • All of the properties should be defined using accessor
// and/or data descriptor, prevent them from being deleted,
// iterated or being modified.
// • Use .toString() to display each instance’s dimensions, its
// area and perimeter.
// • Implement .valueof() so that if there is more than one
// rectangle object we can run arithmetic operation as follows
// : if we have rectangle1 of area 60m2 and rectangle2 of
// 37m2 then rectangle1 + rectangle2 should return 97 and
// rectangle1 - rectangle2 should return 23.
// • you can add any property you need.


function Shape() {
    if (this.constructor === Shape) {
        throw new Error("Cannot instantiate Shape directly!");
    }
}

//? var rectangleCreated = false;
//? var squareCreated = false;


function Rectangle(width, height) {
    //? if (rectangleCreated) {
    //?     throw new Error("Only one Rectangle can be created.");
    //? }
    Shape.call(this); // Call Shape constructor

    defineImmutableProperty(this, 'width', width);
    defineImmutableProperty(this, 'height', height);

    //? rectangleCreated = true;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.area = function() {
    return this.width * this.height;
};

Rectangle.prototype.perimeter = function() {
    return 2 * (this.width + this.height);
};

Rectangle.prototype.toString = function() {
    return "Width: " + this.width + ", Height: " + this.height + ", Area: " + this.area() + ", Perimeter: " + this.perimeter();
};

Rectangle.prototype.valueOf = function() {
    return this.area();
};

function Square(side) {

    //? if (squareCreated) {
    //?     throw new Error("Only one Square can be created.");
    //?  }
    Rectangle.call(this, side, side); // width and height same

    //?squareCreated = true;

    Square.count++;
}

Square.count = 0;



// Setup inheritance
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

function defineImmutableProperty(obj, key, value) {
    Object.defineProperty(obj, key, {
        value: value,
        writable: false,
        enumerable: false,
        configurable: false
    });
}


var rect1 = new Rectangle(10, 20);
console.log(rect1.toString()); // Width: 10, Height: 20, Area: 200, Perimeter: 60

var rect2 = new Rectangle(5, 7);
console.log(rect2.toString()); // Width: 5, Height: 7, Area: 35, Perimeter: 24

console.log(rect1 + rect2); // 200 + 35 = 235
console.log(rect1 - rect2); // 200 - 35 = 165

var sq1 = new Square(5);
console.log(sq1.toString()); // Width: 5, Height: 5, Area: 25, Perimeter: 20

var sq2 = new Square(10);
console.log(sq2.toString()); // Width: 10, Height: 10, Area: 100, Perimeter: 40

console.log("Total Squares created: " + Square.count); // 2

// Attempting to modify properties (won't work)
sq1.width = 100;
console.log(sq1.width); // Still 5

// Attempting to delete properties (won't work)
delete sq1.height;
console.log(sq1.height); // Still 5

// Properties won't show up in for...in loops because enumerable: false
for (var key in rect1) {
    console.log(key); // Nothing printed for width/height
}
