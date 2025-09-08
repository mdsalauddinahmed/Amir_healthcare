import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

// Best practice: declare prisma as a global variable to prevent multiple instances
declare global {
    var prisma: PrismaClient | undefined;
}

// Create a singleton instance of PrismaClient
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

const createAdmin = async (data: {
    admin: {
        email: string;
        name: string;
        contactNumber: string;
    };
    password: string;
}) => {
    try {
        const result = await prisma.$transaction(async (tx) => {

       const hashedPassword = await bcrypt.hash(data.password, 10);



            // First create the user
            const user = await tx.user.create({
                data: {
                    email: data.admin.email,
                    password:hashedPassword,
                    role: UserRole.ADMIN,
                    admin: {
                        create: {
                            name: data.admin.name,
                            contactNumber: data.admin.contactNumber
                        }
                    }
                },
                include: {
                    admin: true
                }
            });

            return user;
        });

        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error('Error in createAdmin:', error);
        throw error;
    }
};

export const userservice = {
    createAdmin
};