import { NextRequest , NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {

    try{
    const token = await request.cookies.get("token")?.value;

    if(!token){return NextResponse.json({ message: "Giriş yapmalısın" }, {status: 401});}

    await prisma.tokens.deleteMany({
        where: {
            token: token
        }
    })

    return NextResponse.json({ message: "Çıkış yapıldı." }, {status: 200});
    }catch(error){
        console.log(error);
        return NextResponse.json({ message: "Hata oluştu." }, {status: 500});
    }
}