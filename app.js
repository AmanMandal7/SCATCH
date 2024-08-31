const cookieParser = require('cookie-parser');
const session = require("express-session")
const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/mongoose-connection');
const indexRouter = require('./routes/indexRouter');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const flash = require('connect-flash');
require("dotenv").config();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(flash());

app.use('/', indexRouter)
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(3000);