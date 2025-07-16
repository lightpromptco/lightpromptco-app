// app/api/messages/[sessionId]/route.ts
import { NextResponse } from 'next/server'
import { storage } from '../../../storage'

export async function GET(request, { params }) {
  const { sessionId } = params

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

export async function DELETE(request, { params }) {
  const { sessionId } = params

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
