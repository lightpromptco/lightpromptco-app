import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Split the path and get the sessionId segment
  const segments = request.nextUrl.pathname.split('/').filter(Boolean);
  const sessionId = segments[segments.length - 1];

  // TODO: Use sessionId for your logic (fetch messages, etc)
  return NextResponse.json({ message: `Session ID is: ${sessionId}` });
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
