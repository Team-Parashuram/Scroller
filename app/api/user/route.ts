import { ConnectToDatabase } from '@/Database/connect.database';
import { auth } from '@clerk/nextjs/server';
import { syncClerkUserToMongoDB } from '@/lib/clerkSync';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Sync Clerk user to MongoDB
    const mongoUser = await syncClerkUserToMongoDB();
    
    if (!mongoUser._id) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await ConnectToDatabase();
    
    return NextResponse.json({ user: mongoUser });
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
