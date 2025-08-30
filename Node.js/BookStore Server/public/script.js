document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
});

async function fetchBooks() {
    try {
        const response = await fetch('/books');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Failed to fetch books:', error);
        const booksContainer = document.getElementById('books-container');
        booksContainer.innerHTML = '<p>Error loading books. Please try again later.</p>';
    }
}

function displayBooks(books) {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = ''; 

    if (!Array.isArray(books) || books.length === 0) {
        booksContainer.innerHTML = '<p>No books found.</p>';
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';

        const imageUrl = `assets/${book.image}`

        bookCard.innerHTML = `
            <img src="${imageUrl}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
        `;
        booksContainer.appendChild(bookCard);
    });
}
