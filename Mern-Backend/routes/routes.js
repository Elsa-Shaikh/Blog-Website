import express from 'express';
import { userSignup,userLogin } from '../controllers/userController.js';
import { uploadImage} from '../controllers/imageController.js';
import { createPost,deletePost,getPost,getPostById,updatePost } from '../controllers/postController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';
import upload from '../middleware/multermiddleware.js';

const router = express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);

router.post('/file/upload',upload.single('file'),uploadImage);

router.post('/create',authenticateToken,upload.single('photo'),createPost);
router.get('/posts',authenticateToken,getPost);
router.get('/post/:id',authenticateToken,getPostById);
router.put('/update/:id',authenticateToken,updatePost);
router.delete('/delete/:id',authenticateToken,deletePost);


export default router