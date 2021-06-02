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
const { userModel } = require('./modules/User');
const { booksModel } = require('./modules/User');

// userModel =userModel.userModel
app.use(express.json());

// connect express server to mongodb server
mongoose.connect('mongodb://localhost:27017/books',
    { useNewUrlParser: true, useUnifiedTopology: true }); //deprecation warnings



app.get('/', homepage);
function homepage(req, res) {
    res.send('Welcome to home page ');
}



/************************ */
function noorUserCollection() {
    const noor = new userModel({
        email: 'noor.hajbi@gmail.com',
        books: [{
            name: 'ٌٌRare cases ',
            status: 'Very good',
            description: 'A psychiatrist writes strange stories that happened with his patients',
        },
        {
            name: 'ٌٌThe Forty Rules of Love',
            status: 'Good',
            description: ' This book explains how the charcter \'Shams\' transformed a scholar into a Sufi (mystic) through love',
        },
        {
            name: 'ٌٌThe rules of Jarteen',
            status: 'Good',
            description: ' rules about a land you live in',
        }],

    })
    console.log(noor)
    const dana = new userModel({
        email: 'younisdana7@gmail.com', books: [
            {
                description: "The story follows the white lawyer Atticus Finch as he attempts to save the life of Tom Robinson, a black man falsely accused of raping a white woman. By being narrated by Finch's six-year-old daughter Scout, the unfairness and incomprehensibility of the situation is illuminated further, seen through the eyes of an innocent child.",
                status: '',
                name: 'To Kill A Mockingbird by Harper Lee'
            },
            {
                description: 'It tells the story of Pip, an orphan who escapes his humble beginnings in order to win the love of an upper-class girl, Estella. Featuring some of the most memorable characters in the literary canon – from escaped convict Magwitch to jilted bride Miss Havisham – it endures as a cautionary tale about the personal cost of misguided social advancement.',
                status: "Dickens' works",
                name: 'Great Expectations by Charles Dickens '
            },
            {
                description: 'Lolita, light of my life, fire of my loins. My sin, my soul. Lo-lee-ta: the tip of the tongue taking a trip of three steps down the palate to tap, at three, on the teeth.',
                status: 'most beautiful and controversial novels in the English',
                name: 'Lolita by Vladimir Nabokov'
            }
        ]
    });
    console.log(dana)
    dana.save();

    //  to actually save them >> save()
    noor.save();
}
/*********************** */

noorUserCollection()
// http://localhost:3001/books?email=noor.hajbi@gmail.com
function usersHandler(req, res) {
    const { email } = req.query;
    userModel.find({ email: email }, function (err, userData) {
        if (err)
            res.send('did not work');
        else
            res.send(userData);
    })
}
// seedKittenCollection();
app.get('/books', usersHandler);

/*********************/
app.post('/books', createBooks);

async function createBooks(request, response) {
    console.log(request.body);
    const { email, bookName, bookDescription, bookStatus } = request.body;
    userModel.find({ email: email }, async (error, data) => {
        console.log('datahhhhhhhhhhhhhhh', data[0].books);
        data[0].books.push({
            name: bookName,
            description: bookDescription,
            status: bookStatus
        });
        await data[0].save();
        response.send(data[0].books);
    });
}



app.delete('/books/:index', deleteBooksForEmail);

function deleteBooksForEmail(req, res) {

    const index = Number(req.params.index);
    console.log(req.params);

    const { email } = req.query;
    console.log(email);
    userModel.find({ email: email }, (err, data) => {

        const newBooksArr = data[0].books.filter((user, idx) => {

            if (idx !== index) return user;



        });
        data[0].books = newBooksArr;
        data[0].save();

        res.send(data[0].books);
    });
}

app.put('/books/:index', updateBooksHandler);
function updateBooksHandler(req, res) {
    console.log(req.body);
    console.log(req.params.index);
    const { email, bookName, bookDescription, bookStatus } = req.body;
    const index = Number(req.params.index);
    userModel.findOne({ email: email }, (error, data) => {
        console.log(data);
        data.books.splice(index, 1, {
            name: bookName,
            description: bookDescription,
            status: bookStatus
        })

        data.save();
        console.log(data)
        res.send(data.books)
    })

}
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})