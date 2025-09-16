import { ConnectToDatabase } from '@/Database/connect.database';
import User from '@/Model/user.model';
import { sendResponse } from '@/util/apiResponse';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('📝 Registration request received');
  
  try {
    const body = await request.json();
    const { email, password } = body;
    
    console.log('📧 Email:', email);
    console.log('🔑 Password length:', password?.length);
    
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return sendResponse(400, 'Email and password are required');
    }

    if (password.length < 6 || password.length > 20) {
      console.log('❌ Password length invalid:', password.length);
      return sendResponse(
        400,
        'Password must be at least 6 and at most 20 characters',
      );
    }

    console.log('🔌 Connecting to database...');
    await ConnectToDatabase();
    console.log('✅ Database connected');

    const existingUser = await User.findOne({
      email,
    });
    
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return sendResponse(400, 'User already exists');
    }

    console.log('👤 Creating new user...');
    // Create user - password will be hashed automatically by the model's pre-save middleware
    const user = new User({
      email,
      password, // Don't hash here - the model will do it
    });
    
    console.log('💾 Saving user to database...');
    await user.save();
    console.log('✅ User created successfully:', email);

    return sendResponse(200, 'User registered successfully', {
      id: user._id,
      email: user.email
    });
  } catch (error) {
    console.log('❌ Registration error:', error);
    return sendResponse(500, 'Internal Server Error');
  }
}
