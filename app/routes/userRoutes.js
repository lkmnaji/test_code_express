// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.createUser);
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.getUsers);
router.get('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.getUserById);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.updateUser);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.deleteUser);

module.exports = router;
