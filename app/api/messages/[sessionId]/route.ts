// app/api/messages/[sessionId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { storage } from '../../../../storage'

export async function GET(request: NextRequest) {
  try {
    // grab the last segment of the path as sessionId
    const segments = request.nextUrl.pathname.split('/').filter(Boolean)
    const sessionId = segments[segments.length - 1]

    const messages = await storage.getMessagesBySession(sessionId)
    return NextResponse.json(messages)
  } catch (err) {
    console.error('Error fetching messages:', err)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // same extraction for DELETE
    const segments = request.nextUrl.pathname.split('/').filter(Boolean)
    const sessionId = segments[segments.length - 1]

    await storage.clearSession(sessionId)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error clearing session:', err)
    return NextResponse.json(
      { error: 'Failed to clear session' },
      { status: 500 }
    )
  }
}
