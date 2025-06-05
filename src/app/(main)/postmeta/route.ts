export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import R2List from '@/lib/r2'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // get all post metadata from R2
  return NextResponse.json(await R2List())
}
