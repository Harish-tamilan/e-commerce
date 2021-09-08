const Product = require('../models/product');
const Cart = require('../models/cart');
const { products } = require('../routes/admin');
const User = require('../models/user');

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
    // Cart.getProducts((cart)=>{
    //     res.render('shop/cart',{
    //         path:'/cart',
    //         prods:cart.products,
    //         pageTitle:'cart'
    //     });

    req.user.getCart(req.user._id,(cart)=>{
        console.log('cart is ');
        console.log(cart); 
        res.render('shop/cart',{
            path:'/cart',
            products:cart.items,
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
        req.user.addToCart(prod, (cart)=>res.render('shop/cart',{
            path:'/cart',
            products:cart.items,
            pageTitle:'cart'
        }));
    });
};

exports.deleteCart = (req,res,next)=>{
    console.log('inside deleteCart, productId is ', req.body.productId);
    req.user.deleteCart(req.body.productId);
    this.getCart(req,res,next);
    //req.user.deleteCart(req.productId)
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

exports.getOrders = (req, res, next)=>{
    req.user.getOrder((orders)=>{
        res.render('shop/order',{
            path:'/order',
            orders:orders,
            pageTitle:'Orders'
        });
    });
}

exports.postOrders = (req, res, next)=>{
    req.user.addOrder((orders)=>{
        res.render('shop/order',{
            path:'/order',
            orders:orders,
            pageTitle:'Orders'
        });
    });

}



