import { Prisma, PrismaClient } from '@prisma/client';
import { paginationHelper } from '../../../helpers/paginationHelper.js';

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

const getAllfromAdmin = async (params:any,options:any ) => {
    // console.log(params);
    try {
       const andCondions: Prisma.AdminWhereInput[] = [];
       const { searchTerm, ...filterData } = params;
     const { page, limit, skip } = paginationHelper.calculatePagination(options);

     

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


      if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    };

 
  const whereConditons: Prisma.AdminWhereInput = { AND: andCondions }
        const result = await prisma.admin.findMany({
            where: whereConditons,
             skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
        });


      const total = await prisma.admin.count({
        where: whereConditons
    });

        return{
            meta:{
                page,
                limit,
                total
            },
            data: {
                result
            }
        };
    } catch (error) {
        console.error('Error in getAllfromAdmin:', error);
        throw error;
    }
};

const getAdminById = async (id: string) => {
 
        const admin = await prisma.admin.findUnique({
            where: { id },
        })
        return admin;
    }

export const adminservice = {
    getAllfromAdmin,
    getAdminById
};
