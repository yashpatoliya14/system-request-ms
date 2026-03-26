import { getDetailsFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET - Get technicians in the same department as the logged-in HOD
export async function GET(req: NextRequest) {
    const userDetail = getDetailsFromToken(req);
    if (!userDetail) {
        return NextResponse.json({ success: false, message: "Unauthorized", data: [] }, { status: 401 });
    }

    if (userDetail.role !== "hod") {
        return NextResponse.json({ success: false, message: "Unauthorized", data: [] }, { status: 401 });
    }

    try {
        // Find HOD's department
        const hodRecord = await prisma.serviceDeptPerson.findFirst({
            where: {
                UserID: BigInt(userDetail.userId),
                IsActive: true,
            },
        });

        if (!hodRecord || !hodRecord.ServiceDeptID) {
            return NextResponse.json({ success: false, message: "HOD not assigned to any department", data: [] }, { status: 404 });
        }

        // Get only technicians from the same department
        const technicians = await prisma.serviceDeptPerson.findMany({
            where: {
                ServiceDeptID: hodRecord.ServiceDeptID,
                IsActive: true,
                Users: {
                    Role: { equals: "technician", mode: "insensitive" },
                },
            },
            include: {
                ServiceDepartment: true,
                Users: true,
            },
        });

        return NextResponse.json(
            { success: true, message: "Department technicians fetched", data: technicians },
            { status: 200 }
        );
    } catch (e) {
        console.log(`Error fetching department technicians: ${e}`);
        return NextResponse.json({ success: false, message: "Failed to fetch technicians", data: [] }, { status: 500 });
    }
}
