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
    // dana.save();

    //  to actually save them >> save()
    // noor.save();
}
noorUserCollection();
/*********************** */
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

module.exports = usersHandler;