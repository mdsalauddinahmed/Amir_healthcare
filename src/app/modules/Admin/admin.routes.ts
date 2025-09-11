 
import express from 'express';
import { Admincontroller } from './admin.controllers.js';

const router = express.Router();
 

router.get('/',Admincontroller.getAllfromDB)
router.get('/:id',Admincontroller.getAdminById)
router.patch('/:id',Admincontroller.updateIntoDB)
router.delete('/:id',Admincontroller.deleteAdminFromDB)
router.delete('/soft/:id',Admincontroller.softDeleteFromDB)


export const AdminRoutes = router;
 
 