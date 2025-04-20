
LnkdLstObj = {
    data: [],

    enqueue: function (val) {
        if (typeof val !== 'number') {
            throw Error('Value must be a number');
        }

        if (this.data.length > 0 && this.data[this.data.length - 1].val >= val) {
            throw Error('Value must be in the sequence');
        }
        if (this.data.some(item => item.val === val)) {
            throw new Error('Value already exists');
        }
        this.data.push({ val });

    },

    push: function (val) {
        if (typeof val !== 'number') {
            throw Error('Value must be a number');
        }
        if (this.data.some(item => item.val === val)) {
            throw Error('Value already exists');
        }

        if (this.data.length === 0 || val > this.data[this.data.length - 1].val) {
            this.data.push({ val });
            return;
        }
        if (val <= this.data[this.data.length - 1].val) {
            throw Error('Value must be greater than the last item');

        }
    },

    insert: function (index, val) {
        if (typeof val !== 'number') {
            throw Error('Value must be a number');
        }

        if (index < 0 || index > this.data.length) {
            throw Error('Index out of range');
        }

        if (this.data.some(item => item.val === val)) {
            throw Error('Value already exists');
        }

        if (index === 0) {
            if (this.data.length > 0 && val >= this.data[0].val) {
                throw Error('Value must be less than next item');
            }
        }
        else if (index === this.data.length) {
            if (val <= this.data[index - 1].val) {
                throw Error('Value must be greater than previous item');
            }
        }
        else {
            if (val <= this.data[index - 1].val || val >= this.data[index].val) {
                throw Error('Value must be in ascending sequence');
            }
        }

        this.data.splice(index, 0, { val });
    },

    pop: function () {
        if (arguments.length > 0) {
            throw Error('Pop function does not accept any arguments');
        }
        if (this.data.length === 0) {
            throw Error('List is empty');
        }
        return this.data.pop();
    },

    remove: function (val) {
        if (typeof val !== 'number') {
            throw Error('Value must be a number');
        }
        if (this.data.length === 0) {
            throw Error('List is empty');
        }

        const index = this.data.findIndex(item => item.val === val);
        if (index === -1) {
            throw Error('Value not found');
        }

        return this.data.splice(index, 1);
    },

    dequeue: function () {
        if (arguments.length > 0) {
            throw Error('Dequeue function does not accept any arguments');
        }
        if (this.data.length === 0) {
            throw Error('List is empty');
        }
        return this.data.shift();
    },

    display: function () {
        if (this.data.length === 0) {
            return "List is empty";
        }

        let values = [];
        let formattedString = "";

        for (let i = 0; i < this.data.length; i++) {
            values.push(this.data[i].val);

            formattedString += this.data[i].val;
            if (i < this.data.length - 1) {
                formattedString += " -> ";
            }
        }
        return formattedString;
    }
};

// LnkdLstObj.push(4);
// LnkdLstObj.push(5);
// LnkdLstObj.push(6);
// LnkdLstObj.push(0);
// LnkdLstObj.push(-1);
// LnkdLstObj.push(4);
// LnkdLstObj.push();
// LnkdLstObj.push('4');

// LnkdLstObj.pop();
// LnkdLstObj.pop(10);
// LnkdLstObj.pop();
// LnkdLstObj.pop();
// LnkdLstObj.pop();


// LnkdLstObj.enqueue(4);
// LnkdLstObj.enqueue(0);
// LnkdLstObj.enqueue(-1);
// LnkdLstObj.enqueue(0);
// LnkdLstObj.enqueue(5);
// LnkdLstObj.enqueue();
// LnkdLstObj.enqueue('-2');

// LnkdLstObj.dequeue();
// LnkdLstObj.dequeue(10);
// LnkdLstObj.dequeue();
// LnkdLstObj.dequeue();
// LnkdLstObj.dequeue();


LnkdLstObj.insert(0, 4);
LnkdLstObj.insert(1, 7);
LnkdLstObj.insert(2, 10);
LnkdLstObj.insert(0, 0);
// LnkdLstObj.insert(0, 1);
LnkdLstObj.insert(1, 1);
// LnkdLstObj.insert(3, 20);
// LnkdLstObj.insert(4, 20);
// LnkdLstObj.insert(5, 20);
// LnkdLstObj.insert(-1, 0);
// LnkdLstObj.insert(8, 100);
// LnkdLstObj.insert(2, 3);
// LnkdLstObj.insert(2, 5);
// LnkdLstObj.insert(4, 5);

// LnkdLstObj.display();
// LnkdLstObj.display("hi");


// LnkdLstObj.remove(5);
LnkdLstObj.remove(50);
LnkdLstObj.remove();
LnkdLstObj.remove('5');
