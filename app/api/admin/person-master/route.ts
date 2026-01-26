import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//types

interface IPersonMasterBody {
    FullName: string;
    Email: string;
    Phone: number;
    Department: string;
    ProfilePhoto: string;
    IsVerified: boolean;
    Username: string;
    Role: string;
    Password: string;

}

interface IPersonMasterResponse {
    success: boolean;
    message: string;
    data: any[];
}


// Create Person Master  
export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const { FullName, Email, Phone, Role, ServiceDeptID } = body;

        //create a user
        const user = await prisma.users.create({
            data: {
                FullName,
                Email,
                Username: Email.substring(0, Email.indexOf("@")),
                Phone,
                IsVerified: true,
                Role: Role,
                ServiceDeptID: ServiceDeptID ? BigInt(ServiceDeptID) : null,
            }
        })
        if (user) {
            return NextResponse.json({ success: true, message: "Signup Successfull", data: [{ Email: user.Email, FullName: user.FullName, Username: user.Username, IsVerified: user.IsVerified }] } as IPersonMasterResponse, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: "Signup Failed", data: [] }, { status: 400 });
        }
    } catch (e) {

        console.log(`Error in creating person master ${e}`);
        return NextResponse.json({ success: false, message: "Signup Failed", data: [] }, { status: 500 });
    }
}

// get all Person master
export async function GET(req: NextRequest) {
    try {

        //get the Persons Master Data
        const users = await prisma.users.findMany({
            include: {
                ServiceDepartment: true,
            },
            where: {
                Role: {
                    in: ["Technician", "HOD"]
                }
            }
        })
        if (users) {
            return NextResponse.json({ success: true, message: "Get All Person Masters Successfull", data: users ? users : [] } as IPersonMasterResponse, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: "Get All Person Master Failed", data: [] }, { status: 400 });
        }
    } catch (e) {

        console.log(`Error in getting all person master ${e}`);
        return NextResponse.json({ success: false, message: "Get All Person Master Failed", data: [] }, { status: 500 });
    }
}
