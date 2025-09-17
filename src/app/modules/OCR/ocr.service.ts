import { Prisma, PrismaClient, UserStatus, type Admin } from '@prisma/client';


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

export const saveOCRResult = async (fileName:any, extractedText:any) => {
  return await prisma.oCRResult.create({
    data: { fileName, extractedText },
  });
};

export const getAllOCRResults = async () => {
  return await prisma.oCRResult.findMany({
    orderBy: { createdAt: "desc" },
  });
};