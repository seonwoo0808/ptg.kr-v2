import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { generateKey, R2Put, validateData } from '@/lib/r2'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const basicAuth = request.headers.get('Authorization')?.split(' ')[1]
  if (!basicAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const [username, password] = Buffer.from(basicAuth, 'base64')
    .toString('utf-8')
    .split(':')
  // sha512 to password
  if (!username || !password) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const hashPassword = crypto
    .createHash('sha512')
    .update(password)
    .digest('hex')
    .toUpperCase()
  if (
    username !== process.env.UPLOAD_EMAIL ||
    hashPassword !== process.env.UPLOAD_PASSWORD_HASH
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (
    !body.title ||
    !body.markdown ||
    !body.description ||
    !body.slug ||
    !body.createdDate
  ) {
    return NextResponse.json(
      { error: 'title, markdown, description, slug, createdDate are required' },
      { status: 400 },
    )
  }
  if (
    validateData(
      body.title,
      body.markdown,
      body.description,
      body.slug,
      new Date(body.createdDate),
    )
  ) {
    return NextResponse.json(
      {
        error: validateData(
          body.title,
          body.markdown,
          body.description,
          body.slug,
          new Date(body.createdDate),
        ),
      },
      { status: 400 },
    )
  }
  try {
    const key = generateKey(
      body.title,
      body.description,
      body.slug,
      new Date(body.createdDate),
    )
    if ((await R2Put(key, body.markdown)) === 'File uploaded successfully') {
      return NextResponse.json(
        { message: 'File uploaded successfully', key },
        { status: 200 },
      )
    }
  } catch (error: any) {}
  return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
}
