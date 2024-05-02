// Part 2
// Objective (OBJ) 1 - Import Express and body-parser
const express = require('express');
const bodyParser = require("body-parser");

// OBJ 2 - Instantiate the Express app
const app = express();

// OBJ 3 - Define the port
const port = 3000;

// OBJ 4 - In-memory Book Data
let books = [
    {id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien'},
    {id: 2, title: 'Pride and Prejudice', author: 'Jane Austen'},
];

// OBJ 5 - Middleware

    // Parse incoming JSON data in requests
app.use(express.json())

    // Configure body-parser to handle URL-encoded form data
app.use(bodyParser.urlencoded({extended:true})); // The purpose of setting extended: true is to account for nested objects

// OBJ 6 - Creating the routes for getting all books (GET /books)
app.get('/books', (req, res) => {
    res.json(books); // The purpose of this line is to send the array of books as JSON response
})

// Part 3
// OBJ 1 - Add the route for creating a book (POST /books)
app.post('/books', (req, res) => {
    const newBook = req.body; // This line allows us to get the new book data from the request body
    newBook.id = books.length + 1; // This line allows the book to be assigned a unique ID
    books.push(newBook); // Add the new book to the array
    res.status(201).json(newBook); // Send created book with status code 201 (Request confirmed)
})

// OBJ 2 - Route for getting a Single Book (GET /book/:id)
app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const book = books.find(book => book.id === bookId);

    if(book) {
        res.json(book); // Send the book data if found
    } else {
        res.status(404).send('Book not found'); // Send error for non-existent book
    }
});

// OBJ 3 - Route for Updating a Book (Put /books/:id)
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const updatedBook = req.body; // Get updated book data from request body

    const bookIndex = books.findIndex(book => book.id  === bookId);

    if (bookIndex !== -1) {
        updatedBook.id = bookId;
        books[bookIndex] = updatedBook; // Update book data in the array
        res.json(updatedBook); // Send updated book data
    } else {
        res.status(404).send('Book not found'); // Send error for non-existent book
    }
});

// OBJ 4 - Route for Deleting a Book (DELETE /books/:id)
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter

    const bookIndex = books.findIndex(book => book.id === bookId); // Locate the index of book through its ID

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1); // Remove book from the array
        res.status(204).send(); // Send empty response resource with status code 204 (No content)
    } else {
        res.status(404).send('Book not found'); // Send error for non-existent book
    }
})

// Part 4
// OBJ 1 - Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});