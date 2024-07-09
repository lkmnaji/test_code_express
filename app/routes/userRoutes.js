// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const authMiddleware = require('../middleware/auth');

router.post('/login', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.loginUser);
router.post('/create-user', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.createUser);
router.get('/get-user', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.getAllUsers);
router.get('/get-user/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.getUserById);
router.put('/update-user/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.updateUser);
router.delete('/delete-user/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.deleteUser);

module.exports = router;
