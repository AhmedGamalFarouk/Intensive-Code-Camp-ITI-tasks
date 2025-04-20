// A.2. Create your own object that contains a list of numerical sequence,
// with the following details
// • Your constructor takes 3 parameters to define start, end of list and
// step
// • The list should be private and filled with private method
// • You can create getter and setter for the list if needed
// • Allow the user to apply the following functionality to his created
// sequence
// o Append or prepend a new value within the same numerical
// sequence
// o Dequeue or pop a value,
// o you have to ensure that you are pushing value within the same
// sequence otherwise through exception
// o you have to ensure that there is no duplicated value otherwise
// through exception
// • all of the properties should be defined using accessor and/or data
// descriptor, prevent them from being deleted, iterated or being
// modified.
// • Override .toString() function to display a message with all of the list
// content.
// • you can add any property you need.


function createSequence(start, end, step) {
    let list = [];

    function validateSequence(start, end, step) {
        if (typeof start !== 'number' || typeof end !== 'number' || typeof step !== 'number') {
            throw new TypeError("Start, end, and step must all be numbers.");
        }
        if (step === 0) {
            throw new Error("Step cannot be zero.");
        }
    }

    function fillSequence(start, end, step) {
        if (step > 0) {
            for (let i = start; i <= end; i += step) {
                list.push(i);
            }
        } else {
            for (let i = start; i >= end; i += step) {
                list.push(i);
            }
        }
    }

    function validateNewValue(value) {
        if (typeof value !== 'number') {
            throw new TypeError("Value must be a number.");
        }
        if (list.includes(value)) {
            throw new Error("Duplicate values are not allowed.");
        }
        if (list.length >= 2) {
            let stepDiff = list[1] - list[0];
            if ((value - list[0]) % stepDiff !== 0) {
                throw new Error("Value does not fit the sequence pattern.");
            }
        }
    }

    validateSequence(start, end, step);
    fillSequence(start, end, step);

    const sequence = {};

    Object.defineProperty(sequence, 'list', {
        get: () => [...list],
        set: () => { throw new Error("Direct modification of the list is not allowed."); },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(sequence, 'append', {
        value: function(value) {
            validateNewValue(value);
            list.push(value);
        },
        writable: false,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(sequence, 'prepend', {
        value: function(value) {
            validateNewValue(value);
            list.unshift(value);
        },
        writable: false,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(sequence, 'dequeue', {
        value: function() {
            if (list.length === 0) throw new Error("Cannot dequeue from an empty sequence.");
            return list.shift();
        },
        writable: false,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(sequence, 'pop', {
        value: function() {
            if (list.length === 0) throw new Error("Cannot pop from an empty sequence.");
            return list.pop();
        },
        writable: false,
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(sequence, 'toString', {
        value: function() {
            return `Sequence: [${list.join(', ')}]`;
        },
        writable: false,
        enumerable: false,
        configurable: false
    });

    Object.freeze(sequence);
    return sequence;
}


const mySeq = createSequence(1, 5, 1);


// mySeq.append(6);
// mySeq.prepend(0);
// console.log(mySeq.list);        
// console.log(mySeq.toString()); 
