import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//types

interface ISignupBody {
    FullName: string;
    Email: string;
    Phone: number;
    ProfilePhoto: string;
    IsVerified: boolean;
    Password: string;
    Username: string;
}

interface ISignupResponse {
    success: boolean;
    message: string;
    data: [{}];
}

// User level signup only 
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { FullName, Email, Phone, ProfilePhoto, Password } = body;

    //create a user
    const user = await prisma.users.create({
        data: {
            FullName,
            Email,
            Username: Email.substring(0, Email.indexOf("@")),
            Phone,
            ProfilePhoto,
            IsVerified: true,
            Password,
            Role: "User"
        }
    })
    return NextResponse.json({ success: true, message: "Signup Successfull", data: [{ Email: user.Email,FullName: user.FullName,Username:user.Username,IsVerified :user.IsVerified}] } as ISignupResponse);
}