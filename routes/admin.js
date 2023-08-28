// Requirements
const express = require('express');
const { upload } = require('../helpers/imageupload');
const fs = require('fs');

// Create router
const router = express.Router();

// Create Models
const Product = require('../models/product');
const Category = require('../models/category');
const Business = require('../models/business');
const Users = require('../models/users');


// Admin Dashboard
router.get('/', async (req, res) => {
    try {
        const [businessInformations, ] = await Business.findAll({raw: true})
  
        res.render('admin/admin-detail', {businessInformations: businessInformations})
    } catch (err) {
        console.log(err);
    }

});

// Post Admin Dasboard
// router.post('/', async (req, res ) =>  {
//     try {
        
//     } catch (err) {
//         console.error(err);
//     }
// });

// Admin Get Login
router.get('/login', (req, res) => {
    res.render('admin/index')
});

// Admin Post Login
router.post('/login', async (req, res) => {
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
        res.redirect('/admin')

    } catch (error) {
        console.log(error);
    }
});

// !Category Routes
// Get Category List
router.get('/categories', async (req, res) => {
    const categories = await Category.findAll({raw:true});
    
    res.render('admin/category-list', {categories: categories});
})

// Get Categori Edit Page
router.get('/categories/:categoryid', async (req, res) => {
    const categoryID = req.params.categoryid;
    const category = await Category.findOne({
        raw: true,
        where: {
            categoryid: categoryID
        }
    });

    res.render('admin/category-edit', {category: category})
})

// Update Category - POST
router.post('/categories/:categoryid', async (req, res) => {
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
});

// Delete Category - POST
router.post('/category/delete/:categoryid', async (req, res) => {
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
});

// Get Category Create Page
router.get('/category/create', (req, res) => {
    res.render('admin/category-add');
});

// Add Category - POST
router.post('/category/create', async (req, res) => {
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
});

// !Product Routes
// Get Product List
router.get('/products', async (req, res) => {
    const products = await Product.findAll({raw:true});
    
    res.render('admin/product-list', {products: products});
})

// Get Product Edit Page
router.get('/products/:productid', async (req, res) => {
    const categories = await Category.findAll({raw:true});
    const productID = req.params.productid;
    const product = await Product.findOne({
        raw: true,
        where: {
            productid: productID
        }
    });

    res.render('admin/product-edit', {product: product, categories: categories})
})

// Get Product Create Page
router.get('/product/create', async (req, res) => {
    const categories = await Category.findAll({raw:true});
    
    res.render('admin/product-add', {categories: categories});
});


// !Category Routes
// Get Category Create Page
// router.get('/category/create', (req, res) => {
//     res.render('admin/category-create');
// });

// // Create Category
// router.post('/category/create', async (req, res) => {
//     const categoryName = req.body.category_name;

//     try {
//         await Category.create({category_name: categoryName});

//         res.redirect('/admin/categories?action=create');
//     } catch (err) {
//         console.log(err);
//     }
// });

// // Get Update Category Page
// router.get('/categories/:categoryid', async (req, res) => {
//     const categoryID = req.params.categoryid;
//     try {
//         const [category, ] = await Category.findAll({
//             raw: true,
//             where: {
//                 categoryid: categoryID
//             }
//         })
//         console.log(category);

//         return res.render('admin/category-edit', {category});   
    
//     } catch (error) {
//         console.error(error);
//     }
// });

// router.post('/categories/:categoryid', async (req, res) => {
//     const categoryID = req.params.categoryid;
//     const categoryIDServer = req.body.categoryid;
//     const categoryName = req.body.category;

//     try {
//         if (categoryID == categoryIDServer) {       
//             await Category.update({
//                 category_name: categoryName
//             },{
//                 where: {
//                     categoryid: categoryID
//                 }
//             })

//             return res.redirect('/admin/categories?action=update') 
//         }
//             res.redirect('/admin/categories?action=error') 
//     } catch (error) {
//         console.error(error);
//     }
// });

// router.use('/categories/delete/:categoryid', async (req, res) => {
//     const categoryID = req.params.categoryid;

//     try {
//         await Category.destroy({
//             where:{
//                 categoryid: categoryID
//             }
//         });
        
//         res.redirect('/admin/categories?action=delete');
//     } catch (error) {
//         console.error(error);
//     }
// });

// // Get Category List
// router.get('/categories', async (req, res) => {
//     const action = req.query.action;

//     try {
//         const categories = await Category.findAll({raw: true})
        
//         res.render('admin/category-list', {categories, action});
//     } catch (error) {
//         console.error(error);
//     }
// });


// // ! Blogs Routes
// // Get Blog Create Page
// router.get('/blog/create', async (req, res) => {
//     try {
//         const categories = await Category.findAll({raw: true})
        
//         res.render('admin/blog-create', {categories});
//     } catch (err) {
//         console.error(err)
//     }

// });

// // Post Blog
// router.post('/blog/create', upload.single('image'), async (req, res) => {
//     try {
//         await Blog.create({
//             title: req.body.title,
//             summary: req.body.summary,
//             description: req.body.description,
//             image: req.file.filename,
//             categoryid: req.body.category,
//             isShownOnPage: req.body.isActiveOnPage  === "on" ? 1 : 0,
//             isActive: req.body.isActive  === "on" ? 1 : 0
//         })

//         res.redirect('/admin/blogs?action=create');

//     } catch (err) {
//         console.error(err)
//     }
// });

// // Delete Blog
// router.get('/blogs/delete/:blogid', async (req, res) => {
//     const blogID = req.params.blogid;

//     try {
//         await Blog.destroy({
//             where:{
//                 blogid: blogID
//             }
//         });

//         res.redirect('/admin/blogs?action=delete')
//     } catch (err) {
//         console.log(err);
//     }
// });

// // Get Blog Update Page
// router.get('/blogs/:blogid', async (req, res) => {
//     const blogID = req.params.blogid;
//     try {
//         const blog = await Blog.findByPk(blogID,{raw:true});
//         const categories = await Category.findAll({raw:true});    

        
//         if (blog) {
//             return res.render('admin/blog-edit', {categories, blog});
//         }
//         res.redirect('/admin/blogs')
//     } catch (err) {
//         console.log(err);
//     }
// });

// // Update Blogs 
// // !TODO: req.file undefined geliyor, image upload çözülecek, html editör kullanılacak
// router.post('/blogs/:blogid', upload.single('image'), async (req, res) => {
//     const blogID = req.params.blogid,
//         blogIDServer = req.body.blogid;

//     try {
//         if (blogID === blogIDServer) {
//             await Blog.update({ 
//                 title: req.body.title,
//                 summary: req.body.summary,
//                 description: req.body.description,
//                 image: req.file ? req.file.filename : req.body.imageServer,
//                 isShownOnPage: req.body.isActiveOnPage  === "on" ? 1 : 0,
//                 isActive: req.body.isActive  === "on" ? 1 : 0,
//                 category: req.body.category
//             }, {
//                 where: {
//                   blogid: blogID
//                 }
//             });

//             if (req.file) {
//                 fs.unlink(`./public/img/${req.body.imageServer}`, err => {
//                     console.error(err);
//                 })
//             }
//             return res.redirect('/admin/blogs?action=update');
//         }
//         res.redirect('/admin/blogs?error=true')
        
//     } catch (err) {
//         console.log(err);
//     }
// });

// // List Blogs
// router.use('/blogs', async (req, res) => {
//     const action = req.query.action;
    
//     try {
//         const blogs = await Blog.findAll({raw: true})

//         res.render('admin/blog-list', {blogs, action});
//     } catch (err) {
//         console.log(err);
//     }
// });

module.exports=router;