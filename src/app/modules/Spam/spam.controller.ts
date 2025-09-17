 
 
import type { Request, Response } from "express";
import predictMessage from "./spam.service.js";
import  { PrismaClient } from "@prisma/client";
declare global {
    var Prisma: PrismaClient | undefined;
}

// Create a singleton instance of PrismaClient
const prisma = global.prisma || new PrismaClient({
    errorFormat: 'minimal',
});

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma;
}

const checkSpam = async (req:Request, res:Response) => {
  try {
    const { messages } = req.body;
    const results = [];

    for (const msg of messages) {
      const prediction =predictMessage(msg);
      const saved = await prisma.message.create({
        data: { text: msg, prediction }
      });
      results.push(saved);
    }

    res.json({ results });
  } catch (error) {
    console.error("Error in checkSpam:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAllMessages = async (req: Request, res: Response) => {
  try {
    // ✅ Use prisma.message.findMany, not PrismaClient.findMany
    const allMessages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json(allMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 export const spamController = { checkSpam, getAllMessages };
