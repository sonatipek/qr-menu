// Requirements
const express = require('express');
const { upload } = require('../helpers/imageupload');
const fs = require('fs');

// Create router
const router = express.Router();

// Controller
const adminController = require('../controller/admin');
const routeProtection = require('../middlewares/routeProtection');

// !Routes
// Admin Routes
router.get('/',routeProtection, adminController.getAdminDashboard);

router.post('/',routeProtection, upload.fields([{ name: 'business_bg'}, { name: 'business_logo'}]), adminController.updateAdminDashboard);

router.post('/logo-delete',routeProtection, adminController.deleteLogo);
router.post('/background-delete',routeProtection, adminController.deleteBg);

router.get('/login', adminController.getLoginPage);

router.post('/login', adminController.postLoginPage);

// Category Routes
router.get('/categories',routeProtection, adminController.getCategoryList)

router.get('/categories/:categoryid',routeProtection, adminController.getCategoryUpdate)

router.post('/categories/:categoryid',routeProtection, adminController.postCategoryUpdate);

router.post('/category/delete/:categoryid',routeProtection, adminController.deleteCategory);

router.get('/category/create',routeProtection, adminController.getCategoryCreate);

router.post('/category/create',routeProtection, adminController.postCategoryCreate);

// Product Routes
router.get('/products', routeProtection, adminController.getProductsList)

router.get('/products/:productid', routeProtection, adminController.getProductUpdate)

router.post('/products/:productid', routeProtection, upload.single('product_image'), adminController.postProductUpdate);

router.post('/product/delete/:productid', routeProtection, adminController.deleteProduct);

// Get Product Create Page
router.get('/product/create',routeProtection, adminController.getProductCreate);

// Add Product - POST
router.post('/product/create',routeProtection, upload.single('product_image'), adminController.postProductCreate);

module.exports=router;