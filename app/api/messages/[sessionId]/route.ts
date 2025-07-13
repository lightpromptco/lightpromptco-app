import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }      // no explicit type here
) {
  try {
    const messages = await storage.getMessagesBySession(params.sessionId)
    return NextResponse.json(messages)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }      // again, let Next infer the type
) {
  try {
    await storage.clearSession(params.sessionId)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to clear session' }, { status: 500 })
  }
}


