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

app.use(express.json());

// connect express server to mongodb server
mongoose.connect('mongodb://localhost:27017/books',
    { useNewUrlParser: true, useUnifiedTopology: true }); //deprecation warnings



app.get('/', homepage);
function homepage(req, res) {
    res.send('Welcome to home page ');
}


// seedKittenCollection();
app.get('/books', usersHandler);

/*********************/
app.post('/books', createBooks);

function createBooks(request, response) {
    console.log(request.body);
    const { email, bookName, bookDescription, bookStatus } = request.body;
    UserModel.find({ email: email }, (error, data) => {
        console.log(data);
        data[0].books.push({
            name: bookName,
            description: bookDescription,
            status: bookStatus
        });
        data[0].save();
        response.send(data[0].books);
    });
}



app.delete('/books/:index', deleteBooksForEmail);

function deleteBooksForEmail(req, res) {

    const index = Number(req.params.index);
    console.log(req.params);

    const { email } = req.query;
    console.log(email);
    UserModel.find({ email: email }, (err, data) => {

        const newBooksArr = data[0].books.filter((user, idx) => {

            if (idx !== index) return user;



        });
        data[0].books = newBooksArr;
        data[0].save();

        res.send(data[0].books);
    });
}
/**************************/

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})