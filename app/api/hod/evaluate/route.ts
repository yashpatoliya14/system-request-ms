import { getDetailsFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface IEvaluateBody {
    ServiceRequestID: string;
    StatusID: string;
    EvaluationNotes?: string;
}

interface IEvaluateResponse {
    success: boolean;
    message: string;
    data: any[];
}

// POST - Evaluate and update request status (HOD only)
export async function POST(req: NextRequest) {
    const user = getDetailsFromToken(req);
    
    if (!user) {
        return NextResponse.json(
            { success: false, message: "Unauthorized", data: [] },
            { status: 401 }
        );
    }

    if (user.role !== "hod") {
        return NextResponse.json(
            { success: false, message: "Access denied. HOD role required.", data: [] },
            { status: 403 }
        );
    }

    try {
        const body = await req.json();
        const { ServiceRequestID, StatusID, EvaluationNotes } = body;

        if (!ServiceRequestID || !StatusID) {
            return NextResponse.json(
                { success: false, message: "ServiceRequestID and StatusID are required", data: [] },
                { status: 400 }
            );
        }

        // Verify the request exists and is completed
        const existingRequest = await prisma.serviceRequest.findUnique({
            where: {
                ServiceRequestID: BigInt(ServiceRequestID)
            },
            include: {
                ServiceRequestStatus: true
            }
        });

        if (!existingRequest) {
            return NextResponse.json(
                { success: false, message: "Service request not found", data: [] },
                { status: 404 }
            );
        }

        // Check if request is in completed/terminal status before evaluation
        const isCompleted = existingRequest.ServiceRequestStatus?.IsTerminal === true;
        
        if (!isCompleted) {
            return NextResponse.json(
                { success: false, message: "Only completed requests can be evaluated", data: [] },
                { status: 400 }
            );
        }

        // Update the request status
        const updatedRequest = await prisma.serviceRequest.update({
            where: {
                ServiceRequestID: BigInt(ServiceRequestID)
            },
            data: {
                StatusID: Number(StatusID)
            }
        });

        if (updatedRequest) {
            return NextResponse.json({
                success: true,
                message: "Request evaluated successfully",
                data: [updatedRequest]
            } as IEvaluateResponse, { status: 200 });
        } else {
            return NextResponse.json({
                success: false,
                message: "Failed to evaluate request",
                data: []
            } as IEvaluateResponse, { status: 500 });
        }

    } catch (e) {
        console.log(`Error in evaluating request: ${e}`);
        return NextResponse.json({
            success: false,
            message: "Evaluation failed",
            data: []
        } as IEvaluateResponse, { status: 500 });
    }
}
