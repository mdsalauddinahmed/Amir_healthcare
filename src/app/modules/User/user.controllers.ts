import type { Request, Response } from "express";
import { userservice } from "./user.services.js";

const createAdmin = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log(data)
        const result = await userservice.createAdmin(data);
        res.status(201).json({
            success: true,
            message: "Admin created successfully!",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create admin",
            error: error instanceof Error ? error.message : "Unknown error occurred"
        });
    }
}

export const usercontroller ={
    createAdmin
}