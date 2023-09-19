// Requirements
const express = require('express');

// Create Router
const router = express.Router();

// Controller
const userController = require('../controller/user');

router.get("/", userController.homepage);

router.get('/:categoryid', userController.productsByCategory);


module.exports=router;