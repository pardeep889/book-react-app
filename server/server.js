const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const config = require('./config/config').get(process.env.NODE_ENV);
const {auth} = require('./middleware/auth');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE,{ useNewUrlParser: true }).then( console.log(`Mongo Connected`)).catch(err => { throw err; });

//middleware 
app.use(bodyParser.json());
app.use(cookieParser());

const {User} = require('./models/user');
const {Book} = require('./models/book');

app.get('/api/auth', auth, (req,res) => {
    res.send({
        isAuth: true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname: req.user.lastname
    })
})

app.get('/api/logout',auth,(req,res) => {
    // res.send(req.user);
    req.user.deleteToken(req.token, (err,user) => {
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });
});

//Books Routes
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

app.delete('/api/deleteBook', (req,res) => {
    let id = req.query.id;
    Book.findByIdAndRemove(id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.json(true);
    });
});

// Users Routes

app.post('/api/register', (req,res) => {
    const user = new User(req.body);
    user.save((err,doc) => {
        if(err) return res.json({success: false});
        res.status(200).json({
            success: true,
            user: doc
        })
    })
});

app.post('/api/login', (req,res) => {
    User.findOne({'email': req.body.email}, (err,user) => {
        if(err) return res.json({success: false});
        if(!user) return res.json({isAuth: false, message: 'Auth Failed {Email not Found}'});
        console.log(user);
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(err) return res.json({success: false});
            if(!isMatch) return res.json({isAuth: false, message: 'Auth Failed {Wrong Password}'});
        });
        user.generateToken((err,user) => {
            if(err) return res.status(400).send(err);
            res.cookie('auth',user.token).send({
                isAuth: true,
                id: user._id,
                email: user.email
            })
        })
    })
});

app.get('/api/getReviewer', (req,res) => {
    let id = req.query.id;
    User.findById(id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.json({
            name: doc.name,
            lastname: doc.lastname
        })
    });
});

app.get('/api/users', (req,res) => {
    User.find({}, (err,users) => {
        if(err) return res.status(400).send(err);
        res.send(users);
    });
});

app.get('/api/userPosts', (req,res) => {
    Book.find({ownerId: req.query.user}).exec((err,books) => {
        if(err) return res.status(400).send(err);
        res.send(books);
    });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    const timing = new Date();
    console.log(`App is listing on ${port} at: ${timing}`);
})

//7 9