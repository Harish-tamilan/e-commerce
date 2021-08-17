const Product = require('../models/product');
//const { products } = require('../routes/admin');

exports.getAddProduct = (req,res,next)=>{
    res.render('admin/add-product',{
        path:'/admin/add-product',
        pageTitle:'Add-Product'
    });
}

exports.postAddProduct = (req,res,next)=>{
    const pro = new Product(req.body.title);
    pro.save();
    res.redirect("/");
}

                                                                                                                                                       