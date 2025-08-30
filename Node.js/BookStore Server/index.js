const express = require('express');
const path = require('path'); 
const bookStore = require('./services/bookStore');

const app = express();
app.use(express.json()); 

app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, 'assets'))); 


app.get('/books', (req, res) => {
  console.log('Received request for /books');
  bookStore.getAllBooks(res);
});

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  bookStore.getBookById(bookId, res);
});

app.post('/books', (req, res) => {
  bookStore.createBook(req, res);
});

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  bookStore.updateBook(bookId, req, res);
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  bookStore.deleteBook(bookId, res);
});


app.use((req, res) => {
  res.status(404).send('Not Found');
});

const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('Server should be continuously listening now.');
});



