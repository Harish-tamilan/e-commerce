const path = require('path');
const rootDir = require('../util/path');
const express = require('express');
const router = express.Router();
const admin = require('./admin');
const controller = require('../controllers/shop');
// router.get('/',(req,res,next)=>{
//     res.sendFile(path.join(rootDir, 'views', 'shop.html'));
// });

router.get('/',controller.showIndex);
router.get('/products',controller.getProducts);
router.get('/products/:productId',controller.productDetail);
router.get('/cart',controller.getCart);
router.post('/cart',controller.addCart);
router.post('/cart-delete-item', controller.deleteCart);
router.get('/order', controller.getOrders);
router.post('/create-order', controller.postOrders);
module.exports = router;