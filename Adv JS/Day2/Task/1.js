// A.1. Using the constructor method for creating Objects, write a script that
// allows you to create a rectangle object that
// • Should have width and height properties.
// • Implement a method for calculating its area
// • Implement a method for calculating its perimeter.
// • Implement displayInfo() function to display a message declaring the
// width, height, area, and perimeter of the created object.

function rectangle(width, height) {
    this.width = width 
    this.height = height

    this.area = function () {
        return this.width * this.height
    }

    this.perimeter = function () {
        return 2 * (this.width + this.height)
    }
    this.displayInfo = function () {
        console.log(`Width: ${this.width}, Height: ${this.height}, Area: ${this.area()}, Perimeter: ${this.perimeter()}`)
    }

    this.displayInfo = function () {
        console.log(`Width: ${this.width}, Height: ${this.height}, Area: ${this.area()}, Perimeter: ${this.perimeter()}`)
    }
}


const rect1 = new rectangle(10, 20)
rect1.displayInfo()
