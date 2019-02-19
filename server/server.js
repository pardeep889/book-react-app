const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const config = require('./config/config').get(process.env.NODE_ENV);

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE,{ useNewUrlParser: true }).then( console.log(`Mongo Connected`)).catch(err => { throw err; });

//middleware 
app.use(bodyParser.json());
app.use(cookieParser());

const {User} = require('./models/user');
const {Book} = require('./models/book');

app.get('/api/getBook', (req,res) => {
    let id = req.query.id;
    Book.findById(id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
});
app.get('/api/getBooks', (req,res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit); 
    let order = req.query.order;
    Book.find().skip(skip).sort({_id: order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
});

app.post('/api/book', (req,res) =>{
    const book = new Book(req.body);
    book.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        })
    })
});

app.post('/api/bookUpdate', (req,res)=>{
    Book.findByIdAndUpdate(req.body._id, req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    })
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    const timing = new Date();
    console.log(`App is listing on ${port} at: ${timing}`);
})

//5 915