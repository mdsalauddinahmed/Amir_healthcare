import pick from "../../Shared/Pick.js";
import sendResponse from "../../Shared/sendResponse.js";
import { adminFilterableFields } from "./admin.constants.js";
import { adminservice } from "./admin.services.js";
import type { NextFunction, Request, Response } from "express";

 


const getAllfromDB = async (req: Request, res: Response,next:NextFunction) => {
    try {

        const filters = pick(req.query, adminFilterableFields);
        const options= pick(req.query, ["sortBy", "limit", "page"]);
        const result = await adminservice.getAllfromAdmin(filters,options);
        // console.log(result)
      sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Admin data fetched successfully",
            meta: result.meta,
            data:result.data
        });
    } catch (error) {
        next(error)
    }
};

const getAdminById = async (req: Request<{ id: string }>, res: Response,next:NextFunction) => {
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
        
       sendResponse(res,{
            statusCode:200,
            success: true,
            message: "Admin fetched successfully",
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const updateIntoDB = (async (req: Request, res: Response,next:NextFunction) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Admin ID is required"
        });
    }

    try {
        const result = await adminservice.updateIntoDB(id, req.body);
         sendResponse(res,{
            statusCode:200,
            success: true,
            message: "Admin updated successfully",
            data: result
        });
    } catch (error) {
        next(error)
        // res.status(404).json({
        //     success: false,
        //     message: "Failed to update admin",
        //     error: error instanceof Error ? error.message : "Unknown error occurred"
        // });
    }
})

const deleteAdminFromDB = (async (req: Request, res: Response,next:NextFunction) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Admin ID is required"
        });
    }

    try {
        const result = await adminservice.deletedAdmin(id);
        sendResponse(res,{
            statusCode:200,
            success: true,
            message: "Admin deleted successfully",
            data: result
        });
    } catch (error) {
        next(error)
    }
})

const softDeleteFromDB = (async (req: Request, res: Response,next:NextFunction) => {
    const { id } = req.params;
        if (!id) {
        return res.status(400).json({
            success: false,
            message: "Admin ID is required"
        });
    }

   try {
        const result = await adminservice.deletedAdmin(id);
        sendResponse(res,{
            statusCode:200,
            success: true,
            message: "Admin deleted successfully",
            data: result
        });
    } catch (error) {
        next(error)
    }
});


export const Admincontroller = {
    getAllfromDB,
    getAdminById,
    updateIntoDB,
    deleteAdminFromDB,
    softDeleteFromDB
};