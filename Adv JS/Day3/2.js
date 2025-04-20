function Vehicle(speed, color) {
    var isStarted = false;
    var isStopped = true;

    Object.defineProperties(this, {
        "speed": {
            get: function () { return speed; },
            set: function (value) {
                if (typeof value !== "number") {
                    throw new TypeError("Speed must be a number");
                }
                speed = value;
            },
            enumerable: true,
            configurable: false
        },
        "color": {
            get: function () { return color; },
            set: function (value) {
                if (typeof value !== "number" && typeof value !== "string") {
                    throw new TypeError("Color must be a number or string");
                }
                color = value;
            },
            enumerable: true,
            configurable: false
        },
        "start": {
            get: function () { return isStarted; },
            set: function (value) {
                if (typeof value !== "boolean") {
                    throw new TypeError("Start must be a boolean");
                }
                isStarted = value;
            },
            enumerable: true,
            configurable: false
        },
        "stop": {
            get: function () { return isStopped; },
            set: function (value) {
                if (typeof value !== "boolean") {
                    throw new TypeError("Stop must be a boolean");
                }
                isStopped = value;
            },
            enumerable: true,
            configurable: false
        }
    });

    this.speed = speed || 0;
    this.color = color || 0;
}

Vehicle.prototype.turnLeft = function () {
    console.log("Vehicle turning left");
};

Vehicle.prototype.turnRight = function () {
    console.log("Vehicle turning right");
};

Vehicle.prototype.goBackward = function (speed, accel) {
    if (typeof speed !== "number" || typeof accel !== "number") {
        throw new TypeError("Speed and acceleration must be numbers");
    }
    console.log("Going backward at speed " + speed + " with acceleration " + accel);
};

Vehicle.prototype.goForward = function (speed, accel) {
    if (typeof speed !== "number" || typeof accel !== "number") {
        throw new TypeError("Speed and acceleration must be numbers");
    }
    console.log("Going forward at speed " + speed + " with acceleration " + accel);
};

Vehicle.prototype.toString = function () {
    return "Vehicle: color=" + this.color + ", speed=" + this.speed;
};

Vehicle.prototype.valueOf = function () {
    return this.speed;
};

function Bicycle(speed, color) {
    Vehicle.call(this, speed, color);
}

Bicycle.prototype = Object.create(Vehicle.prototype);
Bicycle.prototype.constructor = Bicycle;

Bicycle.prototype.ringBell = function () {
    console.log("Ring Ring");
};

Bicycle.prototype.toString = function () {
    return "Bicycle: color=" + this.color + ", speed=" + this.speed;
};

function MotorVehicle(speed, color, sizeOfEngine, licencePlate) {
    Vehicle.call(this, speed, color);

    var sizeOfEngine;
    var licencePlate;

    Object.defineProperties(this, {
        "sizeOfEngine": {
            get: function () { return sizeOfEngine; },
            set: function (value) {
                if (typeof value !== "number") {
                    throw new TypeError("Engine size must be a number");
                }
                sizeOfEngine = value;
            },
            enumerable: true,
            configurable: false
        },
        "licencePlate": {
            get: function () { return licencePlate; },
            set: function (value) {
                if (typeof value !== "string") {
                    throw new TypeError("Licence plate must be a string");
                }
                licencePlate = value;
            },
            enumerable: true,
            configurable: false
        }
    });

    this.sizeOfEngine = sizeOfEngine || 0;
    this.licencePlate = licencePlate || "";
}

MotorVehicle.prototype = Object.create(Vehicle.prototype);
MotorVehicle.prototype.constructor = MotorVehicle;

MotorVehicle.prototype.getSizeOfEngine = function () {
    return this.sizeOfEngine;
};

MotorVehicle.prototype.getLicensePlate = function () {

    return this.licencePlate;
};

MotorVehicle.prototype.toString = function () {
    return "MotorVehicle: color=" + this.color + ", speed=" + this.speed +
        ", engine=" + this.sizeOfEngine + ", plate=" + this.licencePlate;
};

function Car(speed, color, sizeOfEngine, licencePlate, numOfDoors, numWheels, weight) {
    MotorVehicle.call(this, speed, color, sizeOfEngine, licencePlate);

    var numOfDoors;
    var numWheels;
    var weight;

    Object.defineProperties(this, {
        "numOfDoors": {
            get: function () { return numOfDoors; },
            set: function (value) {
                if (typeof value !== "number") {
                    throw new TypeError("Number of doors must be a number");
                }
                numOfDoors = value;
            },
            enumerable: true,
            configurable: false
        },
        "numWheels": {
            get: function () { return numWheels; },
            set: function (value) {
                if (typeof value !== "number") {
                    throw new TypeError("Number of wheels must be a number");
                }
                numWheels = value;
            },
            enumerable: true,
            configurable: false
        },
        "weight": {
            get: function () { return weight; },
            set: function (value) {
                if (typeof value !== "number") {
                    throw new TypeError("Weight must be a number");
                }
                weight = value;
            },
            enumerable: true,
            configurable: false
        }
    });

    this.numOfDoors = numOfDoors || 4;
    this.numWheels = numWheels || 4;
    this.weight = weight || 0;
}

Car.prototype = Object.create(MotorVehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.switchOnAirCon = function () {
    console.log("Air conditioning turned on");
};

Car.prototype.getNumOfDoors = function () {
    return this.numOfDoors;
};

Car.prototype.toString = function () {
    return "Car: color=" + this.color + ", speed=" + this.speed +
        ", engine=" + this.sizeOfEngine + ", plate=" + this.licencePlate +
        ", doors=" + this.numOfDoors + ", wheels=" + this.numWheels +
        ", weight=" + this.weight;
};

function DumpTruck(speed, color, sizeOfEngine, licencePlate, loadCapacity, numWheels, weight) {
    MotorVehicle.call(this, speed, color, sizeOfEngine, licencePlate);

    var loadCapacity;
    var numWheels;
    var weight;

    Object.defineProperties(this, {
        "loadCapacity": {
            get: function () { return loadCapacity; },
            set: function (value) {
                if (typeof value !== "number") {
                    throw new TypeError("Load capacity must be a number");
                }
                loadCapacity = value;
            },
            enumerable: true,
            configurable: false
        },
        "numWheels": {
            get: function () { return numWheels; },
            set: function (value) {
                if (typeof value !== "number") {
                    throw new TypeError("Number of wheels must be a number");
                }
                numWheels = value;
            },
            enumerable: true,
            configurable: false
        },
        "weight": {
            get: function () { return weight; },
            set: function (value) {
                if (typeof value !== "number") {
                    throw new TypeError("Weight must be a number");
                }
                weight = value;
            },
            enumerable: true,
            configurable: false
        }
    });

    this.loadCapacity = loadCapacity || 0;
    this.numWheels = numWheels || 0;
    this.weight = weight || 0;
}

DumpTruck.prototype = Object.create(MotorVehicle.prototype);
DumpTruck.prototype.constructor = DumpTruck;

DumpTruck.prototype.lowerLoad = function () {
    console.log("Lowering load");
};

DumpTruck.prototype.raiseLoad = function () {
    console.log("Raising load");
};

DumpTruck.prototype.toString = function () {
    return "DumpTruck: color=" + this.color + ", speed=" + this.speed +
        ", engine=" + this.sizeOfEngine + ", plate=" + this.licencePlate +
        ", capacity=" + this.loadCapacity + ", wheels=" + this.numWheels +
        ", weight=" + this.weight;
};

try {
    bike = new Bicycle(15, 1);
    car = new Car(60, 2, 2000, "ABC123", 4, 4, 1500);
    truck = new DumpTruck(40, 3, 5000, "XYZ789", 10000, 6, 8000);

    console.log(bike.toString());
    console.log(car.toString());
    console.log(truck.toString());

    bike.ringBell();
    car.switchOnAirCon();
    truck.lowerLoad();

} catch (e) {
    console.error("Error: " + e.message);
}