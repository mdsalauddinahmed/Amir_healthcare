import express from "express";
import { processImage, getAllResults } from "./ocr.controllers.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });
router.post("/upload", upload.single("image"), processImage);
router.get("/results", getAllResults);

export const OCRRoutes = router;