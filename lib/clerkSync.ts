import { currentUser } from '@clerk/nextjs/server';
import { ConnectToDatabase } from '@/Database/connect.database';
import User, { IUser } from '@/Model/user.model';

/**
 * Syncs or creates a user in MongoDB from Clerk authentication
 * This ensures that every Clerk user has a corresponding MongoDB user record
 * 
 * @returns The MongoDB user document with _id
 */
export async function syncClerkUserToMongoDB() {
  try {
    // Get the current authenticated user from Clerk
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      throw new Error('No authenticated user found');
    }

    // Get the primary email address
    const email = clerkUser.emailAddresses.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    if (!email) {
      throw new Error('User email not found');
    }

    // Connect to database and WAIT for it to complete
    await ConnectToDatabase();
    
    // Add a small delay to ensure connection is fully established
    await new Promise(resolve => setTimeout(resolve, 100));

    // Check if user already exists by Clerk ID
    let user = await User.findOne({ clerkId: clerkUser.id });

    if (user) {
      // Update user info if it changed
      let updated = false;
      
      if (user.email !== email) {
        user.email = email;
        updated = true;
      }
      
      if (user.name !== clerkUser.fullName && clerkUser.fullName) {
        user.name = clerkUser.fullName;
        updated = true;
      }
      
      if (user.imageUrl !== clerkUser.imageUrl) {
        user.imageUrl = clerkUser.imageUrl;
        updated = true;
      }

      if (updated) {
        await user.save();
      }
      
      return user;
    }

    // Check if user exists by email (for migration from old auth system)
    user = await User.findOne({ email });

    if (user) {
      // Link existing user to Clerk
      user.clerkId = clerkUser.id;
      user.name = clerkUser.fullName || user.name;
      user.imageUrl = clerkUser.imageUrl || user.imageUrl;
      await user.save();
      return user;
    }

    // Create new user
    user = await User.create({
      clerkId: clerkUser.id,
      email,
      name: clerkUser.fullName,
      imageUrl: clerkUser.imageUrl,
    });

    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * Gets the MongoDB user ID for the current Clerk user
 * Creates the user if they don't exist
 * 
 * @returns The MongoDB user _id as a string
 */
export async function getCurrentMongoUserId(): Promise<string> {
  const user = await syncClerkUserToMongoDB();
  
  if (!user._id) {
    throw new Error('User ID not found');
  }
  
  return user._id.toString();
}
