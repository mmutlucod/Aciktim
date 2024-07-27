const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const authMiddleware = require('../auth');

// Sipariş oluşturma
router.post('/order-create',  OrderController.createOrder);

// Tüm siparişleri listeleme
router.get('/order-list', OrderController.listOrders);

// Sipariş detayını getirme
router.get('/:orderId', OrderController.getOrderById);

// Siparişi güncelleme
router.put('/:orderId', authMiddleware, OrderController.updateOrder);

// Siparişi silme
router.delete('/:orderId', authMiddleware, OrderController.deleteOrder);
router.get('/:userId/orders',  OrderController.listUserOrders);

module.exports = router;