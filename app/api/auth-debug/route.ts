import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/**
 * Debug endpoint to check Clerk authentication status
 * Access at: /api/auth-debug
 */
export async function GET() {
  try {
    const authResult = await auth();
    const user = await currentUser();
    return NextResponse.json({
      success: true,
      clerkUserId: authResult.userId,
      sessionId: authResult.sessionId,
      userExists: !!user,
      userEmail: user?.emailAddresses.find(
        (e) => e.id === user.primaryEmailAddressId
      )?.emailAddress,
      userName: user?.fullName,
      debugInfo: {
        hasAuth: !!authResult.userId,
        hasUser: !!user,
        emailCount: user?.emailAddresses.length || 0,
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
