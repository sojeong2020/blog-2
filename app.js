const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejsmate = require('ejs-mate');
const methodOverride = require('method-override');

const app = express();

app.engine('ejs', ejsmate)
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/diaryDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


const blogSchema = {
    title: String,
    content: String,
};

const Blog = mongoose.model('Blog', blogSchema);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});




app.get('/', (req,res) => {
    res.render('home');
});

app.get('/show', (req,res) => {
    res.render('show');
});

app.get('/stories', (req,res) => {
    res.render('stories')
});

app.get('/new', (req,res) => {
    
    res.render('new')
});

app.get('/edit', (req,res) => {
    
    res.render('edit')
});



app.get('/contact', (req,res) => {
    res.render('contact')
});





app.listen(3000, () => {
    console.log('Serving on port 3000')
});