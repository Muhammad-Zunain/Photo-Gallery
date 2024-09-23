import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost, getAllPost, filterPost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshVerifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.post('/post-create', verifyJWT,refreshVerifyJWT, upload.single('postImage'), createPost)
router.get('/posts', verifyJWT,refreshVerifyJWT, getAllPost)
router.post('/posts-filter/', verifyJWT,refreshVerifyJWT, filterPost)

export default router;
