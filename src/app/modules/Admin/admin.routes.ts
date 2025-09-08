 
import express from 'express';
import { Admincontroller } from './admin.controllers.js';

const router = express.Router();
 

router.get('/',Admincontroller.getAllfromDB)

export const AdminRoutes = router;
 
 