const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.json')
const app = express();
app.use(bodyParser.json());


app.get('/books',(req,res)=>{
  res.status(200).json(data)
})

app.post('/books/:id',(req,res)=>{
  const books = data.find(b=>b.book_id=== req.params.id)
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json(book);
})

app.post('/books', (req, res) => {
  const { book_id, title, author, genre, year, copies } = req.body;
  
  if (!book_id || !title || !author || !genre || !year || !copies) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if book_id already exists
  if (data.find(book => book.book_id === book_id)) {
    return res.status(400).json({ message: 'Book ID already exists' });
  }

  const newBook = { book_id, title, author, genre, year, copies };
  data.push(newBook);
  res.status(201).json(newBook);
});


app.patch('/books/:id', (req, res) => {
  const book = data.find(b => b.book_id === req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const { title, author, genre, year, copies } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (genre) book.genre = genre;
  if (year) book.year = year;
  if (copies) book.copies = copies;

  res.status(200).json(book);
});



app.delete('/books/:id', (req, res) => {
  const bookIndex = data.findIndex(b => b.book_id == req.params.id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  data.splice(bookIndex, 1);
  res.status(200).json({ message: 'Book deleted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
