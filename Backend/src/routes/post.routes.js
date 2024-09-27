import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost, getAllPost, filterPost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.post('/post-create', verifyJWT, upload.single('postImage'), createPost)
router.get('/posts', verifyJWT, getAllPost)
router.post('/posts-filter/', verifyJWT, filterPost)

export default router;
