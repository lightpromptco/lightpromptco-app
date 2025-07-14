// app/api/messages/[sessionId]/route.ts
import { NextResponse } from 'next/server'
import { storage } from '../../../lib/supabaseClient'  // adjust the import path if needed

export async function GET(request: Request, context: any) {
  const sessionId = context.params.sessionId
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

export async function DELETE(request: Request, context: any) {
  const sessionId = context.params.sessionId
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
