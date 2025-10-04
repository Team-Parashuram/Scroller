// File: /src/models/Video.ts
import mongoose from 'mongoose';

// Define VideoTag enum directly here
export enum VideoTag {
  EDUCATIONAL = 'educational',
  ENTERTAINMENT = 'entertainment',
  TECHNOLOGY = 'technology',
  LIFESTYLE = 'lifestyle',
  GAMING = 'gaming',
  MUSIC = 'music',
  SPORTS = 'sports',
  NEWS = 'news',
  COMEDY = 'comedy',
  COOKING = 'cooking',
  TRAVEL = 'travel',
  FITNESS = 'fitness',
  FASHION = 'fashion',
  ART = 'art',
  SCIENCE = 'science',
  OTHER = 'other'
}

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  userId?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  thumbnailUrl: string;
  description: string;
  controls?: boolean;
  transforamtion?: {
    width: number;
    height: number;
    quality?: number;
  };
  videoUrl: string;
  tags: VideoTag[];
  title: string;
  report?: number;
}

const videoSchema = new mongoose.Schema<IVideo>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
      trim: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      enum: Object.values(VideoTag),
      required: [true, 'Tags are required'],
    },
    transforamtion: {
      width: {
        type: Number,
        default: VIDEO_DIMENSIONS.width,
      },
      height: {
        type: Number,
        default: VIDEO_DIMENSIONS.height,
      },
      quality: {
        type: Number,
        min: 1,
        max: 100,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Video = mongoose.models?.Video || mongoose.model<IVideo>('Video', videoSchema);
export default Video;
