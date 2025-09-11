import { z } from "zod";

const update = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required").optional(),
        contactNumber: z.string().min(1, "Contact number is required").optional(),
        profilePhoto: z.string().optional()
    }).strict(),
    params: z.object({
        id: z.string().min(1, "Admin ID is required")
    })
});


export const adminValidationSchemas = {
    update
}