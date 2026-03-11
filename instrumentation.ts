export async function register() {
    // Only run cleanup on the server (Node.js runtime), not on Edge
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const { cleanupExpiredTempUsers } = await import("@/lib/cleanupTempUsers");

        // Run cleanup immediately on server start
        cleanupExpiredTempUsers();

        // Then run cleanup every 10 minutes (600,000 ms)
        const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;
        setInterval(() => {
            cleanupExpiredTempUsers();
        }, CLEANUP_INTERVAL_MS);

        console.log("[Instrumentation] Temp user cleanup scheduled every 10 minutes");
    }
}
