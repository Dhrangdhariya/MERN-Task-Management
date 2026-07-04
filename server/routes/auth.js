const express = require('express');
const router = express.Router();
const { register, login, taskStore, getTask, updateTask, deleteTask, resetPassword, forgotPassword } = require('../controller/authController');
const { protect } = require('../middelware/authentication');

router.post('/register', register);
router.post('/login', login);
router.post('/home', protect, taskStore);
router.get('/home', protect, getTask);
router.put('/home/:id', protect, updateTask);
router.delete('/home/:id', protect, deleteTask);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;