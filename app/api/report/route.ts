import Video from '@/Model/video.model';
import { auth } from '@clerk/nextjs/server';
import { syncClerkUserToMongoDB } from '@/lib/clerkSync';
import { sendResponse } from '@/util/apiResponse';
import { NextRequest, NextResponse } from 'next/server';
import { ConnectToDatabase } from '@/Database/connect.database';

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return sendResponse(401, 'Unauthorized');
    }

    // Sync Clerk user to MongoDB
    const mongoUser = await syncClerkUserToMongoDB();
    
    if (!mongoUser._id) {
      return sendResponse(500, 'Failed to sync user');
    }

    await ConnectToDatabase();

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return sendResponse(400, "Video id is required");
    }

    const video = await Video.findById(id);
    if (!video) {
      return sendResponse(404, "Video not found");
    }

    // Add video to user's reported videos
    mongoUser.reportedVideos = [...(mongoUser.reportedVideos || []), video._id];
    await mongoUser.save();

    video.report = (video.report || 0) + 1;
    await video.save();
    
    if(video.report >= 5) {
      await Video.findByIdAndDelete(video._id);
      return sendResponse(200, "Video deleted successfully");
    }

    return NextResponse.json(video);
  } catch {
    return NextResponse.json(
      { error: 'Failed to report video' },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return sendResponse(401, "Unauthorized");
    }

    await ConnectToDatabase();

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return sendResponse(400, "Video id is required");
    }

    await Video.findByIdAndDelete(id);
    return sendResponse(200, "Video deleted successfully");
  } catch {
    return sendResponse(500, "Internal Server Error");
  }
}
