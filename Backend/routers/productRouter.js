const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const authMiddleware = require('../auth');

// Ürün oluşturma
router.post('/product-create', ProductController.createProduct);

// Tüm ürünleri listeleme
router.get('/product-list', ProductController.listProducts);

// Ürün detayını getirme
router.get('/:productId', ProductController.getProductById);

// Ürünü güncelleme
router.put('/:productId', ProductController.updateProduct);

// Ürünü silme
router.delete('/:productId', ProductController.deleteProduct);

module.exports = router;
