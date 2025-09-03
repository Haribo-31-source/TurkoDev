import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(body: NextRequest) {
    try{
    const token  = await body.cookies.get("token")?.value;
    const result = await prisma.tokens.findUnique({
        where: {
            token: token
        }
    });
    if(token === "" || result === undefined){
        return NextResponse.json({ message: "Giriş yapınız." , ok: false }, { status: 401 });
    }
    if (result) {
        return NextResponse.json({ message: "Giriş yapıldı." , ok: true }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Admin girişi yapınız." , ok: false }, { status: 401 });
    }
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: "Admin girişi yapınız." , ok: false }, { status: 500 });
    }
}