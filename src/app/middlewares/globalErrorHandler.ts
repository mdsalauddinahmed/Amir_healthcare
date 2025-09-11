import type { NextFunction ,Response,Request} from "express"
import { StatusCodes } from "http-status-codes";

const globalErrorHandler =(err:any,req: Request, res: Response, next: NextFunction)=>{
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
   
        success: false,
        message: err instanceof Error ? err.message : "Unknown error occurred",
        error: err

    }
)}

export default globalErrorHandler;
