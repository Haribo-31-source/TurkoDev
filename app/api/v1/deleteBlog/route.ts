import { NextRequest } from "next/server";
import { deleteBlog } from "@/lib/delete";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: NextRequest) {
    const body = await request.json();
    const id = body.id;
    if (!id) return new Response("ID yok.", { status: 400 });

    try {
        const token = await request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Giriş yapınız. Giriş yapılmadan bu fonksiyon yapılamaz. Durum yetkililere raporlandı!", ok: false }, { status: 400 });
        }
        const result = await prisma.tokens.findUnique({
            where: {
                token: token
            }
        });
        if (!result || !token) {
            return NextResponse.redirect(new URL("/admin/login", body.url));
        }
        if (result) {
            await deleteBlog(id);
            return new Response("Blog silindi.", { status: 200 });
        } else {
            return NextResponse.redirect(new URL("/admin/login", body.url));
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Giriş yapınız. Giriş yapılmadan bu fonksiyon yapılamaz. Durum yetkililere raporlandı!", ok: false }, { status: 403 });
    }
}