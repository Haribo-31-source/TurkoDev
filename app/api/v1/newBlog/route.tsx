import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const title = body.title;
    const author = body.author;
    const content = body.content;

    // title = blog title , author = blog author , content = blog content

    const message = `Başarı`;
    return NextResponse.json({ message , title , author , content });
}