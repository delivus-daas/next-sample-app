import {PrismaClient} from "@prisma/client";
// }
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Creating a global instance of PrismaClient or using the existing one
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
    });
// Setting the global Prisma instance if not in production
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;