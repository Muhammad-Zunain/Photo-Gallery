import { Router } from "express";
import { createCategory } from "../controllers/category.controller.js";


const router = Router()

router.post('/category-create', createCategory)

export default router