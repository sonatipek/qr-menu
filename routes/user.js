// Requirements
const express = require('express');

// Create Router
const router = express.Router();

// Controller
const userController = require('../controller/user');

router.use('/:categoryid', userController.productsByCategory);

router.use("/", userController.homepage);

module.exports=router;