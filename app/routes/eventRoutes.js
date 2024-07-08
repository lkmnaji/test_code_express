const express = require('express');
const router = express.Router();
const eventController = require('../Controller/eventController');
const authMiddleware = require('../Middleware/auth');

router.post('/create-event', authMiddleware.verifyToken, authMiddleware.isAdmin, eventController.createEvent);
router.get('/get-event', authMiddleware.verifyToken, eventController.getEvents);
router.get('/get-event/:id', authMiddleware.verifyToken, eventController.getEventById);
router.put('/update-event/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, eventController.updateEvent);
router.delete('/delete-event/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, eventController.deleteEvent);

module.exports = router;
