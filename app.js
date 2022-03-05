const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const Menu = require('./models/menu');
const catchAsync = require('./utils/catchAsync');
const fileUpload = require('express-fileupload')

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/resApp";
mongoose.connect(dbUrl)
    .then(() => {
        console.log("Connected to database...")
    })
    .catch(err => {
        throw err;
    })


const app = express();
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

const sessionConfig = {
    // store,
    name: 'session',
    secret: process.env.SESSION_SEC,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
        // secure: true
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()) //How to store user in session
passport.deserializeUser(User.deserializeUser()) //How to get user out of session

app.use(catchAsync(async (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    res.locals.currentUser = req.user;
    res.locals.msg = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.li = req.flash('li');
    res.locals.menu = await Menu.find({});
    next();
}))

app.use(fileUpload({
    limits: {
        fileSize: 1000000 //5mb
    },
    responseOnLimit: 'Size Limit reached'

}));

app.use('/', require('./routes/auth')) // Auth routes
app.use('/main', require('./routes/main')) // main routes
app.use('/admin', require('./routes/admin')) // admin routes

app.get('/', (req, res) => {
    res.render("home")
});



app.all('*', (req, res, next) => {
    next(new ExpressError('Page not Found', 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});