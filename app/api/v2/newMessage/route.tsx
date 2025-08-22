import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const message = body.message;
    const name = body.name;
    const email = body.email;

    // message = contact form message , name = contact form name , email = contact form email

    return NextResponse.json({ message, name, email });
}