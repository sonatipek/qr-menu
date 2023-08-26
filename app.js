// Requirements
const express = require('express');
const path = require('path');

const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');


// Variables
const PORT = 3000; 

// Create instance
const app = express()

// Middlewares
app.use('/libs', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", 'ejs') 
app.use(express.urlencoded({extended: true}))


// !Routes
app.use('/admin', adminRoutes);
app.use(userRoutes);



app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})