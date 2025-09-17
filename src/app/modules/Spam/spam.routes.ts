import express from "express";
import { spamController } from "./spam.controller.js";
const router = express.Router();
 

router.post('/check', spamController.checkSpam);
router.get('/history', spamController.getAllMessages);

 
export const SpamRoutes = router;