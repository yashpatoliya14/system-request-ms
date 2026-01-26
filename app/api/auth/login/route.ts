import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// User level login only 
export async function POST(req: NextRequest) {
    const body = await req.json();
    const { Email, Password } = body;
    const user = await prisma.users.findFirst({
        where: {
            Email
        }
    })
    //check if user exists
    if(user){
        //check if password is correct
        if(user.Password == Password){

            return NextResponse.json({ success: true, message: "Login Successful", data: [user ? { Email: user.Email,FullName: user.FullName,Username:user.Username,IsVerified :user.IsVerified} : null] },{status:200});
        }else{
            return NextResponse.json({ success: false, message: "Incorrect Password", data: [] }, { status: 401 });
        }
    }else{
        return NextResponse.json({ success: false, message: "User Not Found", data: [] }, { status: 404 });
    }
}