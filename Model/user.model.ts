import mongoose, { Schema, models, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  password?: string; // Optional for Clerk users
  clerkId?: string; // Clerk user ID
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name?: string; // User's full name
  imageUrl?: string; // Profile picture URL
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    clerkId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values for backward compatibility
    },
    name: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      // Not required anymore since Clerk handles auth
    },
  },
  {
    timestamps: true,
  },
);

// Only hash password if it exists (for legacy users)
userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model<IUser>('User', userSchema);

export default User;
