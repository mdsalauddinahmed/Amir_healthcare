import Tesseract from "tesseract.js";
import type { Request, Response } from "express";
import type { Multer } from "multer";
import { getAllOCRResults, saveOCRResult } from "./ocr.service.js";
 


interface MulterRequest extends Request {
  file?:Express.Multer.File;
}

export const processImage = async (req:Request, res:Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imagePath = req.file.path;
    const fileName = req.file.originalname;

    // Perform OCR
    const result = await Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m),
    });

    // Save to DB (via service layer)
    const savedResult = await saveOCRResult(fileName, result.data.text);

    res.status(200).json({
      success: true,
      message: "OCR processed and saved successfully",
      data: savedResult,
    });
  } catch (error) {
    console.error("OCR Error:", error);
    res.status(500).json({ success: false, error: "OCR processing failed" });
  }
};

export const getAllResults = async (req:Request, res:Response) => {
  try {
    const results = await getAllOCRResults();
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("DB Fetch Error:", error);
    res.status(500).json({ success: false, error: "Could not fetch results" });
  }
};
