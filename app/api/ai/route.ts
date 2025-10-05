import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      return NextResponse.json(
        { status: 500, message: 'API Key not found', data: null },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { status: 200, message: 'API Key found', data: API_KEY },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { status: 500, message: 'Internal Server Error', data: null },
      { status: 500 }
    );
  }
}
