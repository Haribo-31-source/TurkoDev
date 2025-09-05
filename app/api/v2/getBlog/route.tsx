import { NextResponse } from 'next/server'
import { getBlog } from '../../../../lib/getBlog'

export async function GET() {
  const response = await getBlog();
  return NextResponse.json(response);
}