const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

//Read
router.get('/users',UserController.get);

//Update
router.put('/images', UserController.updateImages);

module.exports = router;