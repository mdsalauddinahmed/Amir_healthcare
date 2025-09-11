import express from "express";
import userRoutes from "../modules/User/user.routes.js";
 
import { AdminRoutes } from "../modules/Admin/admin.routes.js";

const router = express.Router();

const moduleRouter =[
    {
    path:'/users',
    route:userRoutes

    },
    {
        path:'/admins',
        route:AdminRoutes
    }
];

moduleRouter.forEach(route=>{
    router.use(route.path,route.route); 
})
export default router;