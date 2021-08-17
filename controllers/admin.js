const Product = require('../models/product');
const { products } = require('../routes/admin');
//const { products } = require('../routes/admin');

exports.getAddProduct = (req,res,next)=>{
    res.render('admin/edit-product',{
        path:'/admin/add-product',
        pageTitle:'Add-Product',
        editMode:false
    });
}

exports.postAddProduct = (req,res,next)=>{
    const pro = new Product(null,req.body.title,req.body.imageUrl,req.body.price,req.body.description);
    pro.save();
    res.redirect("/");
}

exports.postEditProduct = (req,res,next)=>{
    console.log('Inside postEditProduct in admin controller');
    const pro = new Product(req.body.id, req.body.title,req.body.imageUrl,req.body.price,req.body.description);
    pro.save();
    res.redirect("/");
}

exports.getProducts = (req,res,next)=>{
    Product.getAll((products)=>{
        res.render('admin/products',{
            prods:products,
            path:'/admin/products',
            pageTitle:'Admin Product List'
        })
    })
}

exports.deleteProduct = (req, res, next)=>{
    Product.delete(req.body.productId, (prods)=>{
        res.render('admin/products',{
            prods:prods,
            path:'admin/products',
            pageTitle:'Admin Product List'
        })
    });
}

exports.getEditProduct = (req,res,next)=>{
    console.log('inside editProduct in admin.js');
    const editMode = req.query.edit;
    if(editMode)
    {
        const id = req.params.productId;
        Product.findById(id,(prod)=>{
            res.render('admin/edit-product',
                {
                    prod:prod,
                    path:'admin/add-product',
                    pageTitle:'Add Product',
                    editMode:editMode
                }
            )
        });
    }
    else
    {
        res.redirect("/");
    }
}
                                                                                                                                                       