import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { sendOtpViaEmail } from "@/services/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { Email }: { Email: string } = body;

        // Check if the user exists in the users table
        const existingUser = await prisma.users.findFirst({
            where: { Email }
        });

        if (!existingUser) {
            return NextResponse.json(
                { success: false, message: "No account found with this email", data: [] },
                { status: 404 }
            );
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        // Send OTP via email
        const status = await sendOtpViaEmail(Email, otp);

        if (status) {
            // Store OTP in tempUser (upsert in case one already exists)
            await prisma.tempUser.upsert({
                where: { Email },
                update: {
                    Otp: otp,
                    OtpExpired: otpExpiry,
                },
                create: {
                    Email,
                    Otp: otp,
                    OtpExpired: otpExpiry,
                    Password: existingUser.Password ?? "",
                    FullName: existingUser.FullName,
                    Username: existingUser.Username,
                    ProfilePhoto: existingUser.ProfilePhoto,
                    IsVerified: true,
                    Phone: existingUser.Phone,
                    Role: existingUser.Role ?? "user"
                }
            });

            return NextResponse.json({
                success: true,
                message: "OTP sent successfully",
                data: []
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Failed to send OTP. Please try again.",
                data: []
            });
        }
    } catch (error) {
        console.error("Send reset OTP error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error", data: [] },
            { status: 500 }
        );
    }
}
