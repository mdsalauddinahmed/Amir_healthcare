import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./app/routes/index.js";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base route
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to Healthcare API"
    });
});

// Application Routes
app.use('/api/v1', routes);
 
app.use(globalErrorHandler)


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})


export default app;