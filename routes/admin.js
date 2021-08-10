const path = require('path');
const express = require('express');
const app = express();
const rootDir = require('../util/path');
const router = express.Router();
const controller = require('../controllers/products');

// router.get('/add-product',(req,res,next)=>{
//     res.sendFile(path.join(rootDir, 'views','add-product.html'));
// });

const products = [];

router.get('/add-product', controller.getAddProduct);

// router.post('/add-product',(req,res,next)=>{
//     console.log(req.body);
//     res.redirect('/');
// });

router.post('/add-product', controller.postAddProduct);

exports.routes = router;
exports.products = products;