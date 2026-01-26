import { PrismaClient } from "@prisma/client";

// Global fix: Make BigInt serializable to JSON (define once, works everywhere)
(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;

};
export const prisma = globalForPrisma.prisma || new PrismaClient();