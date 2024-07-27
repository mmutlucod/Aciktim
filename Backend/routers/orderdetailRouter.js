const express = require('express');
const router = express.Router();
const OrderdetailController = require('../controllers/orderdetailController');
const authMiddleware = require('../auth');

// Sipariş detayı oluşturma
router.post('/orderdetail-create', OrderdetailController.createOrderdetail);

// Tüm sipariş detaylarını listeleme
router.get('/orderdetail-list', OrderdetailController.listOrderdetails);

// Sipariş detayını getirme
router.get('/:orderdetailId', OrderdetailController.getOrderdetailById);

// Sipariş detayını güncelleme
router.put('/:orderdetailId', OrderdetailController.updateOrderdetail);

// Sipariş detayını silme
router.delete('/:orderdetailId', OrderdetailController.deleteOrderdetail);

module.exports = router;
