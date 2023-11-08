import express from 'express';
import { userSignup,userLogin } from '../controllers/userController.js';
import { uploadImage,getImage } from '../controllers/imageController.js';
import { createPost,getPost,getPostById } from '../controllers/postController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import upload from '../middleware/upload.js'

const router = express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);

router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename',getImage);

router.post('/create',authenticateToken,createPost);
router.get('/posts',authenticateToken,getPost);
router.get('/post/:id',authenticateToken,getPostById);

export default router