const express = require('express')
const path = require('path')
const route = express.Router();
const Book = require('../database/books')

route.get('/', (req, res) => {
    res.sendFile('index.html')
})

route.get('/books', async(req, res) => {
    const books = await Book.find();
    res.json(books)
})

route.post('/insertBook', async(req, res) => {
    
    const book = new Book();
    book.titulo = req.body.titulo;
    book.descripcion = req.body.descripcion;
    book.isbn = req.body.isbn;
    book.autor = req.body.autor;

    console.log(book);
    await book.save();
    
    res.redirect('/')
})

route.get('/insertBook', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/insertBook.html'))
})

route.get('/author/:name', (req, res) => {
    const autor = await 
})

route.delete('/delete/:id',async (req, res) => {
    const deleted = await Book.findByIdAndDelete({_id: req.params.id})

    res.json(deleted)
})

route.get('/addToList/:id',async (req, res) => {
    const book = await Book.findById({_id: req.params.id})
    
    res.json(book)
})


module.exports = route;