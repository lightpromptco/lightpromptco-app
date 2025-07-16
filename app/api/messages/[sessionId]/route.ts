// app/api/messages/[sessionId]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { storage } from '../../../storage'

export async function GET(request: NextRequest) {
  // Pull sessionId from the URL
  const parts = new URL(request.url).pathname.split('/')
  const sessionId = parts[parts.length - 1]

  try {
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
  // Pull sessionId from the URL
  const parts = new URL(request.url).pathname.split('/')
  const sessionId = parts[parts.length - 1]

  try {
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
