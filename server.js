'use strict';
//CRUD
//Create : add data  (POST)
//Read: get data  (GET)
//Update (PUT)
//Delete (DELETE)
//REST
//Represntational state transfer
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
app.use(cors());
const PORT = process.env.PORT;

//modules
const usersHandler = require('./modules/User');


// connect express server to mongodb server
mongoose.connect('mongodb://localhost:27017/books',
    { useNewUrlParser: true, useUnifiedTopology: true }); //deprecation warnings



app.get('/', homepage);
function homepage(req, res) {
    res.send('Welcome to home page ');
}


// seedKittenCollection();
app.get('/books', usersHandler);


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})