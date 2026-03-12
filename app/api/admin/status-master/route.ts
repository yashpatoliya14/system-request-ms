import { getDetailsFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Types
interface IStatusResponse {
    success: boolean;
    message: string;
    data: any[];
}

// POST - Create a new status
export async function POST(req: NextRequest) {
    try {
        const user = getDetailsFromToken(req);
        if (!user) {
            return NextResponse.json({ success: false, message: "User Not Found", data: [] }, { status: 401 });
        }
        if (user.role !== "admin") {
            return NextResponse.json({ success: false, message: "Unauthorized", data: [] }, { status: 401 });
        }

        const body = await req.json();
        const {
            ServiceRequestStatusName,
            ServiceRequestStatusSystemName,
            Sequence,
            Description,
            ServiceRequestStatusCssClass,
            IsOpen,
            IsNoFurtherActionRequired,
            IsAllowedForTechnician,
        } = body;

        // Get next available ID
        const maxId = await prisma.serviceRequestStatus.aggregate({
            _max: { ServiceRequestStatusID: true },
        });
        const nextId = (maxId._max.ServiceRequestStatusID || 0) + 1;

        const status = await prisma.serviceRequestStatus.create({
            data: {
                ServiceRequestStatusID: nextId,
                ServiceRequestStatusName,
                ServiceRequestStatusSystemName: ServiceRequestStatusSystemName || ServiceRequestStatusName.toLowerCase().replace(/\s+/g, "_"),
                Sequence: Sequence ? parseFloat(Sequence) : nextId,
                Description: Description || null,
                UserID: BigInt(user.userId),
                ServiceRequestStatusCssClass: ServiceRequestStatusCssClass || null,
                IsOpen: IsOpen ?? true,
                IsNoFurtherActionRequired: IsNoFurtherActionRequired ?? false,
                IsAllowedForTechnician: IsAllowedForTechnician ?? false,
            },
        });

        if (status) {
            return NextResponse.json(
                { success: true, message: "Status Created Successfully", data: [status] } as IStatusResponse,
                { status: 200 }
            );
        } else {
            return NextResponse.json({ success: false, message: "Status Creation Failed", data: [] }, { status: 400 });
        }
    } catch (e) {
        console.log(`Error in creating status: ${e}`);
        return NextResponse.json({ success: false, message: "Status Creation Failed", data: [] }, { status: 500 });
    }
}

// GET - Get all statuses
export async function GET() {
    try {
        const statuses = await prisma.serviceRequestStatus.findMany({
            orderBy: { Sequence: "asc" },
        });

        return NextResponse.json(
            { success: true, message: "Get All Statuses Successful", data: statuses || [] } as IStatusResponse,
            { status: 200 }
        );
    } catch (e) {
        console.log(`Error in getting all statuses: ${e}`);
        return NextResponse.json({ success: false, message: "Get All Statuses Failed", data: [] }, { status: 500 });
    }
}
