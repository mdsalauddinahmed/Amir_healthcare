import express from "express";
import cors from "cors";
import userRoutes from "./modules/User/user.js";
const app = express();
app.use(cors());
app.use(express.json());
// Base route
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to Healthcare API"
    });
});
// User routes
app.use('/api/users', userRoutes);
export default app;
//# sourceMappingURL=app.js.map