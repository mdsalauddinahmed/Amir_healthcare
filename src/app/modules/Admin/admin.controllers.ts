import { adminservice } from "./admin.services.js";
import type { Request, Response } from "express";

const getAllfromDB = async (req: Request, res: Response) => {
    try {
        const result = await adminservice.getAllfromAdmin();
        // console.log(result)
        res.status(200).json({
            success: true,
            message: "Admin data fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch admin data",
            error: error instanceof Error ? error.message : "Unknown error occurred"
        });
    }
};

export const Admincontroller = {
    getAllfromDB
};