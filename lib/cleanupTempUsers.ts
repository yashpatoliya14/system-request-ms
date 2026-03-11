import { prisma } from "@/lib/prisma";

/**
 * Deletes all tempUser records whose OTP has expired.
 * A tempUser's OTP is considered expired when `OtpExpired` < now.
 */
export async function cleanupExpiredTempUsers() {
    try {
        const result = await prisma.tempUser.deleteMany({
            where: {
                OtpExpired: {
                    lt: new Date(),
                },
            },
        });

        if (result.count > 0) {
            console.log(
                `[Cleanup] Deleted ${result.count} expired temp user(s) at ${new Date().toISOString()}`
            );
        }
    } catch (error) {
        console.error("[Cleanup] Failed to delete expired temp users:", error);
    }
}
