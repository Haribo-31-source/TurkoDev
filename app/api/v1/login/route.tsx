import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === process.env.ADMIN_USERNAME! && password === process.env.ADMIN_PASSWORD!) {
    const token = crypto.randomBytes(32).toString("hex");
    const res = NextResponse.json({ message: "Admin giriş yapıldı."}, { status: 200 });
    res.cookies.set("token", token, {
      maxAge: 10 * 60,  // 10 dakika
      path: "/",        // tüm siteye geçerli
      secure: true,     // sadece HTTPS
      httpOnly: true,   // client JS erişemez
      sameSite: "strict"
    });
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
}