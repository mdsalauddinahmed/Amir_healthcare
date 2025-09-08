import { Prisma, PrismaClient } from '@prisma/client';

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

const getAllfromAdmin = async (params:any) => {
    console.log(params);
    try {
       const andCondions: Prisma.AdminWhereInput[] = [];

    //console.log(filterData);
    if (params.searchTerm) {
        andCondions.push({
            OR:  ["name","email"].map(field => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };
  const whereConditons: Prisma.AdminWhereInput = { AND: andCondions }
        const result = await prisma.admin.findMany({
            where: whereConditons
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
