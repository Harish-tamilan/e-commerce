const path = require('path');
const express = require('express');
const app = express();
const rootDir = require('../util/path');
const router = express.Router();
const controller = require('../controllers/admin');

// router.get('/add-product',(req,res,next)=>{
//     res.sendFile(path.join(rootDir, 'views','add-product.html'));
// });

const products = [];

router.get('/add-product', controller.getAddProduct);

// router.post('/add-product',(req,res,next)=>{
//     console.log(req.body);
//     res.redirect('/');
// });

router.get('/products',controller.getProducts);

router.post('/add-product', controller.postAddProduct);

router.post('/edit-product', controller.postEditProduct);

router.get('/edit-product/:productId', controller.getEditProduct);

router.post('/delete-product', controller.deleteProduct);

exports.routes = router;
exports.products = products;