import  express  from "express";
import cors from "cors";
import userRoutes from "./app/modules/User/user.routes.js";
import { AdminRoutes } from "./app/modules/Admin/admin.routes.js";
 


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/admins', AdminRoutes);

// Base route
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to Healthcare API"
    });
});

// User routes
app.use('/api/users', userRoutes);
app.use('/api/admins', AdminRoutes);

export default app;