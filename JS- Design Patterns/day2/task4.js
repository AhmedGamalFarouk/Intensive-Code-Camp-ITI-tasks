class Product {
    constructor(name) {
        this.name = name;
    }

    getPages() {
    }

    display() {
    }
}

// Leaf
class Book extends Product {
    constructor(name, pages) {
        super(name);
        this.pages = pages;
    }

    getPages() {
        return this.pages;
    }

    display(indent = '') {
        console.log(`${indent}- ${this.name} (${this.pages} pages)`);
    }
}

class Box extends Product {
    constructor(name) {
        super(name);
        this.children = [];
    }

    add(product) {
        this.children.push(product);
    }

    remove(product) {
        const index = this.children.indexOf(product);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    getPages() {
        return this.children.reduce((total, child) => total + child.getPages(), 0);
    }

    display(indent = '') {
        console.log(`${indent}+ ${this.name}`);
        this.children.forEach(child => {
            child.display(indent + '  ');
        });
    }
}

// Client code
const book1 = new Book("The Lord of the Rings", 1178);
const book2 = new Book("The Hobbit", 310);
const book3 = new Book("Design Patterns", 395);
const book4 = new Book("Clean Code", 464);

const smallBox = new Box("Small Box");
smallBox.add(book3);
smallBox.add(book4);

const bigBox = new Box("Big Box");
bigBox.add(book1);
bigBox.add(book2);
bigBox.add(smallBox);

console.log("Displaying hierarchy and pages for the Big Box:");
bigBox.display();
console.log(`\nTotal pages in Big Box: ${bigBox.getPages()}`);

console.log("\nDisplaying hierarchy and pages for the Small Box:");
smallBox.display();
console.log(`\nTotal pages in Small Box: ${smallBox.getPages()}`);