import { NextResponse } from 'next/server'
import { getChat } from '@/lib/getChat';

export async function GET() {
  const response = await getChat();
  return NextResponse.json(response);
}