import express from 'express';
import { usercontroller } from './user.controllers.js';

const router = express.Router();

router.post('/', usercontroller.createAdmin)

const userRoutes = router;

export default userRoutes;