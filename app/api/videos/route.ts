import { ConnectToDatabase } from '@/Database/connect.database';
import { auth } from '@clerk/nextjs/server';
import { syncClerkUserToMongoDB } from '@/lib/clerkSync';
import Video, { IVideo } from '@/Model/video.model';
import { sendResponse } from '@/util/apiResponse';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await ConnectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return sendResponse(404, 'No videos found');
    }
    return sendResponse(200, 'Videos found', videos);
  } catch {
    return sendResponse(500, 'Internal Server Error');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return sendResponse(401, 'Unauthorized - Please sign in');
    }

    let mongoUser;
    try {
      mongoUser = await syncClerkUserToMongoDB();
    } catch (syncError) {
      return NextResponse.json(
        { 
          error: 'Failed to authenticate',
          details: syncError instanceof Error ? syncError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
    
    if (!mongoUser._id) {
      return sendResponse(500, 'Failed to sync user');
    }

    await ConnectToDatabase();
    const body: IVideo = await request.json();
    
    // Use the MongoDB user ID for the video
    body.userId = mongoUser._id;

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return sendResponse(400, 'Bad Request');
    }

    const videoData = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transforamtion?.quality ?? 100,
      },
    };

    const video = await Video.create(videoData);

    return NextResponse.json(video);
  } catch (createError) {
    return NextResponse.json(
      { 
        error: 'Failed to create video',
        details: createError instanceof Error ? createError.message : 'Unknown error'
      },
      { status: 500 },
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
