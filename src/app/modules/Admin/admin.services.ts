import { Prisma, PrismaClient, UserStatus, type Admin } from '@prisma/client';
import { paginationHelper } from '../../../helpers/paginationHelper.js';
import type { IAdminFilterRequest } from './admin.interface.js';
import type { IPaginationOptions } from '../../Interfaces/pagination.js';

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

const getAllfromAdmin = async (params:IAdminFilterRequest,options:IPaginationOptions ) => {
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

const getAdminById = async (id: string): Promise<Admin | null> => {
 
        const admin = await prisma.admin.findUnique({
            where: { id,isDeleted: false },
        })
        return admin;
    }


const updateIntoDB = async (id: string, payload: Partial<Admin>): Promise<Admin> => {
    // Remove email from the payload as it shouldn't be updated directly
    const { email, ...data } = payload; 

    const isExist=await prisma.admin.findUniqueOrThrow({
        where:{id}
    })

    const result = await prisma.admin.update({
        where: {
            id,
            isDeleted: false
        },
        data
    });

    return result;
};

const deletedAdmin= async (id: string): Promise<Admin | null> => {

    await prisma.admin.findUniqueOrThrow({
        where: {
            id
        }
    });

    const result = await prisma.$transaction(async (transactionClient) => {
        const adminDeletedData = await transactionClient.admin.delete({
            where: {
                id,
                isDeleted: false
            }
        });

        await transactionClient.user.delete({
            where: {
                email: adminDeletedData.email
            }
        });

        return adminDeletedData;
    });

    return result;
}


const softDeleteFromDB = async (id: string): Promise<Admin | null> => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });

    const result = await prisma.$transaction(async (transactionClient) => {
        const adminDeletedData = await transactionClient.admin.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        });

        await transactionClient.user.update({
            where: {
                email: adminDeletedData.email
            },
            data: {
                status: UserStatus.DELETED
            }
        });

        return adminDeletedData;
    });

    return result;
}


export const adminservice = {
    getAllfromAdmin,
    getAdminById,
    updateIntoDB,
    deletedAdmin,
    softDeleteFromDB
    
};
