import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//types

interface IDepartmentBody {
    DepartmentName: string;
    DepartmentID:string;
}

interface IDepartmentResponse {
    success: boolean;
    message: string;
    data: any[];
}


// Create Department  
export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const { DeptName } = body;

        //create a user
        const department = await prisma.serviceDepartment.create({
            data: {
                DeptName:DeptName,
                
            }
        })
        if (department) {
            return NextResponse.json({ success: true, message: "Department Created Successfull", data: [department] } as IDepartmentResponse, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: "Department Creation Failed", data: [] }, { status: 400 });
        }
    } catch (e) {

        console.log(`Error in creating department ${e}`);
        return NextResponse.json({ success: false, message: "Department Creation Failed", data: [] }, { status: 500 });
    }
}

// get all Departments
export async function GET(req: NextRequest) {
    try {

        //get the Departments Data
        const departments = await prisma.serviceDepartment.findMany()
        if (departments) {
            return NextResponse.json({ success: true, message: "Get All Departments Successfull", data: departments ? departments : [] } as IDepartmentResponse, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: "Get All Departments Failed", data: [] }, { status: 400 });
        }
    } catch (e) {

        console.log(`Error in getting all departments ${e}`);
        return NextResponse.json({ success: false, message: "Get All Departments Failed", data: [] }, { status: 500 });
    }
}
