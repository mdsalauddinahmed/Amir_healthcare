import pick from "../../Shared/Pick.js";
import { adminFilterableFields } from "./admin.constants.js";
import { adminservice } from "./admin.services.js";
import type { Request, Response } from "express";

const getAllfromDB = async (req: Request, res: Response) => {
    try {

        const filters = pick(req.query, adminFilterableFields);
        const options= pick(req.query, ["sortBy", "limit", "page"]);
        const result = await adminservice.getAllfromAdmin(filters,options);
        // console.log(result)
        res.status(200).json({
            success: true,
            message: "Admin data fetched successfully",
            meta: result.meta,
            data:result.data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch admin data",
            error: error instanceof Error ? error.message : "Unknown error occurred"
        });
    }
};

const getAdminById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Admin ID is required"
            });
        }

        const result = await adminservice.getAdminById(id);
        
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Admin fetched successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch admin data",
            error: error instanceof Error ? error.message : "Unknown error occurred"
        });
    }
}
export const Admincontroller = {
    getAllfromDB,
    getAdminById
};