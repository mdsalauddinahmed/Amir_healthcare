import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validateRequest = (schema: z.ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies
        });
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }))
            });
        } else {
            next(error);
        }
    }
};

export default validateRequest;