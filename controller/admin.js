// Requirements
const fs = require('fs');

// Create Models
const Product = require('../models/product');
const Category = require('../models/category');
const Business = require('../models/business');
const Users = require('../models/users');

// Admin Dashboard
exports.getAdminDashboard = async (req, res) => {
    const action = req.query.action;
    try {
        const [businessInformations, ] = await Business.findAll({raw: true})
  
        res.render('admin/admin-detail', {businessInformations: businessInformations, action})
    } catch (err) {
        console.log(err);
    }
}

exports.updateAdminDashboard = async (req, res) => {
    const businessName = req.body.bussiness_name,
        businessID = req.body.server_businessid,
        businessAdress = req.body.business_adress,
        businessTel = req.body.business_tel,
        businessOpen = req.body.business_open,
        businessClose = req.body.business_close,
        businessIg = req.body.business_ig,
        businessWeb = req.body.business_web;
    
    try {
        let businessLogo = req.body.server_logo;
        let businessBg = req.body.server_bg;

        if (req.files['business_logo']) {
            businessLogo = req.files['business_logo'][0].filename;

            fs.unlink("./public/img/" + req.body.server_logo, err => {
                console.log(err);
            })
        }
        if (req.files['business_bg']) {
            businessBg = req.files['business_bg'][0].filename;

            fs.unlink("./public/img/" + req.body.server_bg, err => {
                console.log(err);
            })
        }
    

        await Business.update({
            business_name:  businessName,
            business_adress: businessAdress,
            business_tel: businessTel,
            business_open: businessOpen,
            business_close: businessClose,
            business_ig: businessIg,
            business_web: businessWeb,
            business_logo: businessLogo,
            business_bg: businessBg
        }, {
            where: {
                businessId: businessID
        }})


        res.redirect('/admin?action=update')
    } catch (err) {
        console.log(err);
    }

}

exports.getLoginPage = (req, res) => {
    res.render('admin/index')
}

exports.postLoginPage = async (req, res) => {
    const username = req.body.username, password = req.body.password;

    try {
        const user = await Users.findOne({
            raw:true,
            where: {
                username: username
            }
        });

        if(!user){
            return res.render('admin/', {
                title: "login",
                message: "Kullanıcı bulunamadı!"
            })
        }

        if (password != user.password) {
            return res.render('admin/', {
                title: "login",
                message: "Parola hatalı!"
            })
        }
        res.redirect('/admin?action=login')

    } catch (error) {
        console.log(error);
    }
}

exports.deleteLogo = async (req, res) => {
    try {
        const business = await Business.findOne({raw:true});


        fs.unlink("./public/img/" + business.business_logo, err => {
            console.log(err);
        });


        return res.redirect('/admin?action=update')

    } catch (error) {
     console.log(error);   
    }
}

exports.deleteBg = async (req, res) => {
    try {
        const business = await Business.findOne({raw:true});


        fs.unlink("./public/img/" + business.business_bg, err => {
            console.log(err);
        });


        return res.redirect('/admin?action=update')

    } catch (error) {
     console.log(error);   
    }
}

// Category Controllers
exports.getCategoryList = async (req, res) => {
    const action = req.query.action;
    const categories = await Category.findAll({raw:true});
    
    res.render('admin/category-list', {categories: categories, action});
}

exports.getCategoryUpdate = async (req, res) => {
    const categoryID = req.params.categoryid;
    const category = await Category.findOne({
        raw: true,
        where: {
            categoryid: categoryID
        }
    });

    res.render('admin/category-edit', {category: category})
}

exports.postCategoryUpdate = async (req, res) => {
    const categoryID = req.params.categoryid;
    const categoryIDServer = req.body.category_id;
    const categoryName = req.body.category_name;

    try {
        if (categoryID == categoryIDServer) {       
            await Category.update({
                category_name: categoryName
            },{
                where: {
                    categoryid: categoryID
                }
            })

            return res.redirect('/admin/categories?action=update') 
        }
            res.redirect('/admin/categories?action=error') 
    } catch (error) {
        console.error(error);
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const categoryID = req.params.categoryid;
        await Category.destroy({
            where:{
                categoryid: categoryID
            }
        })

        res.redirect('/admin/categories?action=delete')
    } catch (err) {
        console.error(err);
    }
}

exports.getCategoryCreate = (req, res) => {
    res.render('admin/category-add');
}

exports.postCategoryCreate = async (req, res) => {
    try {
        if (req.body.category_name) {
            await Category.create({
                category_name: req.body.category_name,
            });
            res.redirect('/admin/categories?action=create');
        }
        else{
            res.redirect('/admin/category/create?action=isNull');
        }
            

    } catch (err) {
        console.error(err)
    }
}

// Products Controllers
exports.getProductsList = async (req, res) => {
    const action = req.query.action;
    const products = await Product.findAll({raw:true});
    const categories = await Category.findAll({raw:true});
    
    res.render('admin/product-list', {products: products, categories: categories ,action});
}

exports.getProductUpdate = async (req, res) => {
    const categories = await Category.findAll({raw:true});
    const productID = req.params.productid;
    const product = await Product.findOne({
        raw: true,
        where: {
            productid: productID
        }
    });

    res.render('admin/product-edit', {product: product, categories: categories})
}

exports.postProductUpdate = async (req, res) => {
    const productID = req.params.productid;
    const productIDServer = req.body.productid;
    
    const productTitle = req.body.product_name;
    const productAmount = req.body.product_amount;
    const productDesc = req.body.product_description;
    let productImage = req.body.server_image;
    const categoryID = req.body.product_category;

    if (req.file) {
        productImage = req.file.filename;

        fs.unlink("./public/img/" + req.body.server_image, err => {
            console.log(err);
        })
    }
    

    try {
        if (productID == productIDServer) {       
            await Product.update({
                title: productTitle,
                amount: productAmount,
                description: productDesc,
                image: productImage,
                categoryid: categoryID,
            },{
                where: {
                    productid: productIDServer
                }
            })

            return res.redirect('/admin/products?action=update') 
        }
            res.redirect('/admin/products?action=error') 
    } catch (error) {
        console.error(error);
    }
}

exports.deleteProduct = async (req, res ) =>  {
    try {
        const productID = req.params.productid;
        const product = await Product.findByPk(productID,{raw:true});

        await Product.destroy({
            where:{
                productid: productID
            }
        });

        fs.unlink("./public/img/" + product.image, err => {
            console.log(err);
        })

        res.redirect('/admin/products?action=delete')
    } catch (err) {
        
    }
}

exports.getProductCreate = async (req, res) => {
    const categories = await Category.findAll({raw:true});
    
    res.render('admin/product-add', {categories: categories});
}

exports.postProductCreate = async (req, res) => {
    try {

        if (req.body.product_title && req.body.product_amount && req.body.product_description && req.body.product_category && req.file) {
            await Product.create({
                title: req.body.product_title,
                amount: req.body.product_amount,
                description: req.body.product_description,
                image: req.file.filename,
                categoryid: req.body.product_category,
            });
            res.redirect('/admin/products?action=create');
        }
        else{
            res.redirect('/admin/product/create?action=isNull');
        }
            

    } catch (err) {
        console.error(err)
    }
}