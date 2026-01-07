import express from "express";
import { createCategory, getAllCategories } from "../controller/category.controller.js";

const router = express.Router();

// Accept JSON body with image URL; no upload middleware
router.post("/create", createCategory);
router.get("/all", getAllCategories);

export default router;
