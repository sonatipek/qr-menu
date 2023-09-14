// Requirements
const express = require('express');
const { upload } = require('../helpers/imageupload');
const fs = require('fs');

// Create router
const router = express.Router();

// Controller
const adminController = require('../controller/admin');

// !Routes
// Admin Routes
router.get('/', adminController.getAdminDashboard);

router.post('/', upload.fields([{ name: 'business_bg'}, { name: 'business_logo'}]), adminController.updateAdminDashboard);

router.get('/login', adminController.getLoginPage);

router.post('/login', adminController.postLoginPage);

// Category Routes
router.get('/categories', adminController.getCategoryList)

router.get('/categories/:categoryid', adminController.getCategoryUpdate)

router.post('/categories/:categoryid', adminController.postCategoryUpdate);

router.post('/category/delete/:categoryid', adminController.deleteCategory);

router.get('/category/create', adminController.getCategoryCreate);

router.post('/category/create', adminController.postCategoryCreate);

// Product Routes
router.get('/products', adminController.getProductsList)

router.get('/products/:productid', adminController.getProductUpdate)

router.post('/products/:productid', upload.single('product_image'), adminController.postProductUpdate);

router.post('/product/delete/:productid', adminController.deleteProduct);

// Get Product Create Page
router.get('/product/create', adminController.getProductCreate);

// Add Product - POST
router.post('/product/create', upload.single('product_image'), adminController.postProductCreate);

module.exports=router;