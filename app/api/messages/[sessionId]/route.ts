// app/api/messages/[sessionId]/route.ts
import { NextResponse } from 'next/server'
import { storage } from '../../storage'

export async function GET(
  request: Request,
  context      // give the full context object a name
) {
  const sessionId = context.params.sessionId

  try {
    const messages = await storage.getMessagesBySession(sessionId)
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  context
) {
  const sessionId = context.params.sessionId

  try {
    await storage.clearSession(sessionId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error clearing session:', error)
    return NextResponse.json(
      { error: 'Failed to clear session' },
      { status: 500 }
    )
  }
  