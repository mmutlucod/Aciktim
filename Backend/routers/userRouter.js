const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../auth');

// Kullanıcı oluşturma
router.post('/user-create', UserController.createUser);

// Tüm kullanıcıları listeleme
router.get('/user-list', UserController.listUsers);

// Kullanıcı detayını getirme
router.get('/:userId', UserController.getUserById);

// Kullanıcıyı güncelleme
router.put('/:userId', UserController.updateUser);

// Kullanıcıyı silme
router.delete('/:userId', UserController.deleteUser);

router.post('/login', UserController.loginUser);
router.post('/register', UserController.registerUser);
router.get('/:userId/orders', UserController.getUserOrders);


module.exports = router;