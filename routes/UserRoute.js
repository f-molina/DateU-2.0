const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const multer = require('multer');
const upload = multer({dest:'uploads/'});
// const cors = require('cors');

router.use(express.static('../public'));
// router.use(cors());
//Read
router.get('/users',UserController.get);

//Update
router.put('/images', upload.any(), UserController.updateImages);

router.post('/updateInfo', UserController.updateInfo);

module.exports = router;