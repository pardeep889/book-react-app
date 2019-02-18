const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const config = require('./config/config').get(process.env.NODE_ENV);

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE,{ useNewUrlParser: true });

//middleware 
app.use(bodyParser.json());
app.use(cookieParser());

const {User} = require('./models/user');
const {Book} = require('./models/book');

const port = process.env.PORT || 3001;
app.listen(port, () => {
    const timing = new Date();
    console.log(`App is listing on ${port} at: ${timing}`);
})