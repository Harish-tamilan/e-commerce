const path = require('path');
const rootDir = require('../util/path');
const express = require('express');
const router = express.Router();
const admin = require('./admin');
const controller = require('../controllers/products');

// router.get('/',(req,res,next)=>{
//     res.sendFile(path.join(rootDir, 'views', 'shop.html'));
// });

router.get('/',controller.getAllProducts);

module.exports = router;