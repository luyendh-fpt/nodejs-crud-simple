var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController')

/* GET users listing. */
router.get('/create', productController.create);

router.post('/create', productController.save);

router.get('/list', productController.getList);

module.exports = router;
