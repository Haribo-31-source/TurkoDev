import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const title = body.title;
    const author = body.author;
    const content = body.content;

    if(!title || !author || !content) {
        return NextResponse.json({ message: "İsim, yazar ve içerik zorunludur." }, { status: 400 });
    }

    try{
        await prisma.blogs.create({
            data: {
                title: title,
                author: author,
                content: content,
            },
        })
        return NextResponse.json({ res: "Blog gönderildi." }, { status: 200 });
    }
    catch (error) {
      console.log(error + "Hata Oluştu");
      return NextResponse.json({ message: "Hata oluştu." }, { status: 500 });
    }
}