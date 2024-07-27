const express = require('express');
const router = express.Router();
const PaymentTypeController = require('../controllers/paymentController');
const authMiddleware = require('../auth');

// Ödeme türü oluşturma
router.post('/payment-create',authMiddleware, PaymentTypeController.createPaymentType);

// Tüm ödeme türlerini listeleme
router.get('/payment-list',authMiddleware, PaymentTypeController.listPaymentTypes);

// Ödeme türü detayını getirme
router.get('/:paymentTypeId',authMiddleware, PaymentTypeController.getPaymentTypeById);

// Ödeme türünü güncelleme
router.put('/:paymentTypeId',authMiddleware, PaymentTypeController.updatePaymentType);

// Ödeme türünü silme
router.delete('/:paymentTypeId',authMiddleware, PaymentTypeController.deletePaymentType);

module.exports = router;