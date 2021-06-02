'use srtict'
const mongoose = require('mongoose');

// connect express server to mongodb server
mongoose.connect('mongodb://localhost:27017/books',
    { useNewUrlParser: true, useUnifiedTopology: true }); //deprecation warnings


//  create collections
//  create schema and model
// Schema: determines how the shape of our data will look like (blueprint)
const bookSchema = new mongoose.Schema({
    name: String,
    status: String,
    description: String,
})
const userSchema = new mongoose.Schema({
    email: String,
    books: [bookSchema]
});



// build a model from our schema
// schema: drawing phase
// model: creation phase
const userModel = mongoose.model('user', userSchema);
const booksModel = mongoose.model('book', bookSchema);


module.exports = {userModel,booksModel};