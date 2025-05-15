const express = require('express');

const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleWare = require('../middleware/admin-middleware')
const uploadMiddleWare = require('../middleware/upload-middleware')
const {uploadImageController,fetchImageController} = require('../controllers/image-controller')


const router = express.Router();

// upload image:
router.post('/upload',authMiddleware,uploadMiddleWare.single('image') ,uploadImageController)

// fetch all images
router.get('/get',authMiddleware,fetchImageController)

module.exports=router;