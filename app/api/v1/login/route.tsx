export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try{

  if (username === process.env.ADMIN_USERNAME! && password === process.env.ADMIN_PASSWORD!) {
    const token = crypto.randomBytes(32).toString("hex");
    const res = NextResponse.json({ message: "Giriş başarılı.", redirect: true }, { status: 200 });
    res.cookies.set("token", token, {
      maxAge: 10 * 60,  // 10 dakika
      path: "/",        // tüm siteye geçerli
      secure: true,     // sadece HTTPS
      httpOnly: true,   // client JS erişemez
      sameSite: "strict"
    });
    await prisma.tokens.create({
      data: {
        token: token,
      },
    })
    return res;
  } else {
    const token = crypto.randomBytes(32).toString("hex");
    const res = NextResponse.json({ message: "Kullanıcı adı veya şifre hatalı." }, { status: 401 });
    res.cookies.set("token", token, {
      maxAge: 10 * 60,  // 10 dakika
      path: "/",        // tüm siteye geçerli
      secure: true,     // sadece HTTPS
      httpOnly: true,   // client JS erişemez
      sameSite: "strict"
    });
    return res;
  }
  } catch (error) {
    console.log(error + "Hata Oluştu");
    return NextResponse.json({ message: "Hata oluştu." }, { status: 500 });
  }
}