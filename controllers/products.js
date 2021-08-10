const Product = require('../models/product');
//const { products } = require('../routes/admin');

exports.getAddProduct = (req,res,next)=>{
    res.render('add-product',{
        path:'/admin/add-product',
        pageTitle:'Add-Product'
    });
}

exports.postAddProduct = (req,res,next)=>{
    const pro = new Product(req.body.title);
    pro.save();
    res.redirect("/");
}

exports.getAllProducts = (req,res,next)=>{
    Product.getAll((products)=>{
        res.render('shop',{
            path:'/',
            prods:products,
            pageTitle:'Shop'
        });
    })
}                                                                                                                                                       