import express from "express";
import userRoutes from "../modules/User/user.routes.js";
 
import { AdminRoutes } from "../modules/Admin/admin.routes.js";
import { OCRRoutes } from "../modules/OCR/ocr.routes.js";
import { SpamRoutes } from "../modules/Spam/spam.routes.js";
 

const router = express.Router();

const moduleRouter =[
    {
    path:'/users',
    route:userRoutes

    },
    {
        path:'/admins',
        route:AdminRoutes
    },
    {
        path:'/ocr',
        route:OCRRoutes
    },
    {
        path:'/spam',
        route:SpamRoutes
    }
];

moduleRouter.forEach(route=>{
    router.use(route.path,route.route); 
})
export default router;