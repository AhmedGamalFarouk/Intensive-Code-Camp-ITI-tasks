const path = require('path');
const FILE_PATH = path.join(__dirname, "../data/books.json");
const fileUtils = require("../utils/filesUtil");

const getAllBooks = (res) => {
  try {
    const books = fileUtils.readJson(FILE_PATH);
    res.status(200).json(books);
  } catch (error) {
    console.error("Error in getAllBooks when trying to read/parse books data:", error);
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

const getBookById = (bookId, res) => {
  try {
    const books = fileUtils.readJson(FILE_PATH);
    const book = books.find(book => book.id === bookId);
    
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve book' });
  }
};

const createBook = (req, res) => {
  try {
    const bookData = req.body;
    if (!bookData.id || !bookData.title) {
      return res.status(400).json({ error: 'Book ID and title are required' });
    }
    
    const books = fileUtils.readJson(FILE_PATH);

    if (books.some(book => book.id === bookData.id)) {
      return res.status(409).json({ error: 'Book with this ID already exists' });
    }
    books.push(bookData);
    fileUtils.writeJson(FILE_PATH, books);
    
    res.status(201).json({ message: 'Book created successfully', book: bookData });
  } catch (error) {
    console.error("Error in createBook:", error);
    res.status(500).json({ error: 'Failed to create book' });
  }
};

const updateBook = (bookId, req, res) => {

  try {
    const bookData = req.body; 

    if (Object.keys(bookData).length === 0) {
        return res.status(400).json({ error: 'Request body cannot be empty' });
    }

    const books = fileUtils.readJson(FILE_PATH);
    const bookIndex = books.findIndex(book => book.id === bookId);
    
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
    

    books[bookIndex] = { ...books[bookIndex], ...bookData, id: bookId }; 
    fileUtils.writeJson(FILE_PATH, books);
    
    res.status(200).json({ message: 'Book updated successfully', book: books[bookIndex] });
  } catch (error) {
    console.error("Error in updateBook:", error); 
    res.status(500).json({ error: 'Failed to update book' });
  }
};

const deleteBook = (bookId, res) => {
  try {
    let books = fileUtils.readJson(FILE_PATH);
    const initialLength = books.length;
    books = books.filter(book => book.id !== bookId);
    
    if (books.length === initialLength) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    fileUtils.writeJson(FILE_PATH, books);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
