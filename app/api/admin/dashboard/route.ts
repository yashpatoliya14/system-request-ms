import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const [
            totalUsers,
            totalDepartments,
            totalServiceTypes,
            totalRequestTypes,
            totalPersonnel,
            totalRequests,
            hodCount,
            technicianCount,
            activeRequestTypes,
            statusCounts,
        ] = await Promise.all([
            prisma.users.count(),
            prisma.serviceDepartment.count(),
            prisma.serviceType.count(),
            prisma.serviceRequestType.count(),
            prisma.serviceDeptPerson.count({ where: { IsActive: true } }),
            prisma.serviceRequest.count(),
            prisma.users.count({ where: { Role: { equals: "hod", mode: "insensitive" } } }),
            prisma.users.count({ where: { Role: { equals: "technician", mode: "insensitive" } } }),
            prisma.serviceRequestType.count({ where: { IsActive: true } }),
            prisma.serviceRequest.groupBy({
                by: ["StatusID"],
                _count: { ServiceRequestID: true },
            }),
        ]);

        // Get status names for the grouped counts
        const statuses = await prisma.serviceRequestStatus.findMany();
        const requestsByStatus = statusCounts.map((sc) => {
            const status = statuses.find((s) => s.ServiceRequestStatusID === sc.StatusID);
            return {
                statusName: status?.ServiceRequestStatusName ?? "Unknown",
                count: sc._count.ServiceRequestID,
                cssClass: status?.ServiceRequestStatusCssClass ?? "",
            };
        });

        const data = {
            totalUsers,
            totalDepartments,
            totalServiceTypes,
            totalRequestTypes,
            totalPersonnel,
            totalRequests,
            hodCount,
            technicianCount,
            activeRequestTypes,
            requestsByStatus,
        };

        return NextResponse.json({ success: true, message: "Dashboard stats fetched", data }, { status: 200 });
    } catch (e) {
        console.log(`Error fetching dashboard stats: ${e}`);
        return NextResponse.json({ success: false, message: "Failed to fetch dashboard stats", data: null }, { status: 500 });
    }
}
