import { PrismaClient } from '@prisma/client';

// Best practice: declare prisma as a global variable to prevent multiple instances
declare global {
    var prisma: PrismaClient | undefined;
}

// Create a singleton instance of PrismaClient
const prisma = global.prisma || new PrismaClient({
    errorFormat: 'minimal',
});

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

const getAllfromAdmin = async () => {
    try {
        const result = await prisma.admin.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                contactNumber: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        role: true,
                        status: true
                    }
                }
            },
            where: {
                isDeleted: false
            }
        });
        return result;
    } catch (error) {
        console.error('Error in getAllfromAdmin:', error);
        throw error;
    }
};

export const adminservice = {
    getAllfromAdmin
};
