 
import express from 'express';
import { Admincontroller } from './admin.controllers.js';
import validateRequest from '../../middlewares/validatedRequest.js';
import { adminValidationSchemas } from './admin.validations.js';

const router = express.Router();
 

router.get('/',   Admincontroller.getAllfromDB)
router.get('/:id',Admincontroller.getAdminById)
router.patch('/:id',validateRequest(adminValidationSchemas.update), Admincontroller.updateIntoDB)
router.delete('/:id',Admincontroller.deleteAdminFromDB)
router.delete('/soft/:id',Admincontroller.softDeleteFromDB)


export const AdminRoutes = router;
 
 