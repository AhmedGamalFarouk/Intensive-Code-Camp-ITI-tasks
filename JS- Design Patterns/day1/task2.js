class Document {
    constructor(header, footer, pages, text) {
        this.header = header;
        this.footer = footer;
        this.pages = pages;
        this.text = text;
    }

    clone() {
        const cloned = Object.create(Object.getPrototypeOf(this));
        cloned.header = this.header;
        cloned.footer = this.footer;
        cloned.pages = this.pages;
        cloned.text = this.text;
        return cloned;
    }

    display() {
        console.log(`--- Document ---`);
        console.log(`Header: ${this.header}`);
        console.log(`Text: ${this.text}`);
        console.log(`Pages: ${this.pages}`);
        console.log(`Footer: ${this.footer}`);
        console.log(`----------------`);
    }
}


const originalDocument = new Document(
    "My Original Document Header",
    "My Original Footer",
    10,
    "This is the main content of the original document."
);

console.log("Original Document:");
originalDocument.display();


const clonedDocument = originalDocument.clone();


clonedDocument.header = "Cloned Document Header";
clonedDocument.pages = 12;
clonedDocument.text = "This is the main content for the cloned document. Some sections have been updated.";
clonedDocument.footer = "Cloned Document Footer ";


console.log("\nCloned Document (modified):");
clonedDocument.display();

console.log("\nOriginal Document (after cloning and modifying clone):");
originalDocument.display();