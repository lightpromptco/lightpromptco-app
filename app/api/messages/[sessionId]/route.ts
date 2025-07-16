// app/api/messages/[sessionId]/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { storage } from '../../../storage'

export async function GET(request: NextRequest) {
  // extract sessionId from the URL
  const parts = request.nextUrl.pathname.split('/')
  const sessionId = parts[parts.length - 1]!

  try {
    const messages = await storage.getMessagesBySession(sessionId)
    return NextResponse.json(messages)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const parts = request.nextUrl.pathname.split('/')
  const sessionId = parts[parts.length - 1]!

  try {
    await storage.clearSession(sessionId)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to clear session' }, { status: 500 })
  }
}


