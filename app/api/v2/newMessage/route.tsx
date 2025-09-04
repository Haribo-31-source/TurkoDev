import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const message = body.message;

    try{
      await prisma.chat.create({
        data: {
          message: message,
        },
      })
      return NextResponse.json({ res: "Mesaj gönderildi." }, { status: 200 });
    } catch (error) {
      console.log(error + "Hata Oluştu");
      return NextResponse.json({ message: "Hata oluştu." }, { status: 500 });
    }
}