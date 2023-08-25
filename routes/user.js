// Requirements
const express = require('express');

// Create Router
const router = express.Router();

// Create Models
const Product = require('../models/product');
const Category = require('../models/category');
const Business = require('../models/business');

// Poducts by Category
router.use('/:categoryid', async (req, res) => {
    try {
        const categoryid = req.params.categoryid;
        const products = await Product.findAll({
            raw: true,
            where:{
                categoryid: categoryid
            }
        });
        const categories = await Category.findAll({raw: true});
        const business = await Business.findAll({raw: true});
        
        res.render("pages/index", {products: products, categories: categories, selectedCategory: categoryid, business: business[0]});
    } catch (err) {
        console.log(err);
    }
});


// Homepage
router.use("/",async (req, res) => {
    try {
        res.redirect(301, "/1");
        
    } catch (err) {
        console.log(err);
    }  
});

module.exports=router;