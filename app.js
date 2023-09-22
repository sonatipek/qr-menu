// Requirements
const express = require('express');
const path = require('path');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');



// Variables
const PORT = process.env.PORT || 3000; 

// Create instance
const app = express();
const session = require('express-session');
const sequelize = require('./data/db');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Middlewares
app.use('/libs', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", 'ejs') 
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //2 gün
    },
    store: new SequelizeStore({
        db: sequelize
    })
}));


// !Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);

// IIFE - to data sync
(async () => {
    await sequelize.sync({alter: true})
})();

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})