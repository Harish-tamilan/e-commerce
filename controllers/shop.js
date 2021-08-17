const Product = require('../models/product');
const Cart = require('../models/cart');
const { products } = require('../routes/admin');

exports.showIndex = (req,res,next)=>{
    Product.getAll((products)=>{
        res.render('shop/index',{
            path:'/',
            prods:products,
            pageTitle:'Shop'
        });
    })
}

exports.getProducts = (req,res,next)=>{
    console.log('inside getProducts');
    Product.getAll((products)=>{
        res.render('shop/products-list',{
            path:'/products',
            prods:products,
            pageTitle:'Shop'
        });
    })
}

exports.getCart = (req,res,next)=>{
    Cart.getProducts((cart)=>{
        res.render('shop/cart',{
            path:'/cart',
            prods:cart.products,
            pageTitle:'cart'
        });
    })
};

exports.addCart = (req,res,next)=>{
    
    console.log('Inside addCart method in shop.js and the body is ');
    console.log(req.body.productId);

    Product.findById(req.body.productId,(prod)=>{
        console.log('prod is ');
        console.log(prod);
        const product = new Cart(req.body.productId, parseInt(prod.price));
        product.add((cart)=>res.render('shop/cart',{
            path:'/cart',
            prods:cart.products,
            pageTitle:'cart'
        }));
    });
};

exports.deleteProduct = (req,res,next)=>{
    Product.findById(req.body.productId, (prod)=>{
        Cart.deleteProduct(prod.id, prod.price);
        this.getCart(req,res,next);
    });
};

exports.productDetail = (req,res,next)=>{
    console.log('inside productDetail method');
    Product.findById(req.params.productId, (prod)=>{
        res.render('shop/product-detail',{
            path:'/product-list',
            product:prod,
            pageTitle:'Product Detail'
        });
    });
}



