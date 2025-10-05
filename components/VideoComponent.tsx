import React from 'react';
import { IKVideo } from 'imagekitio-next';
import { IVideo } from '@/Model/video.model';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2Icon, PlayCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import { apiClient } from '@/lib/apiClient';

export default function VideoComponent({ video }: { video: IVideo }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const { user } = useUser();
  const videoRef = React.useRef<HTMLDivElement>(null);

  const handleDelete = async () => {
    try {
      if (video._id) {
        await apiClient.deleteVideo(video._id.toString());
        toast.success('Video deleted successfully');
      } else {
        toast.error('Video ID is missing');
      }
    } catch {
      toast.error('Failed to delete video');
    }
  };

  const canDelete = user && video.userId?.toString() === user.id && video._id;

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  return (
    <Card
      className="group relative overflow-hidden glass-card border-border/50 rounded-xl transition-all duration-300 w-full max-w-xs mx-auto hover-lift"
      ref={videoRef}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: '9/16', maxHeight: '360px' }}
      >
        <div className="relative w-full h-full rounded-t-lg overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Skeleton className="w-full h-full bg-muted/50 animate-pulse" />
              <PlayCircle className="absolute w-12 h-12 text-primary/50 animate-pulse" />
            </div>
          )}

          <div className="video-player relative w-full h-full">
            <IKVideo
              path={video.videoUrl}
              transformation={[
                {
                  height: '640',
                  width: '360',
                },
              ]}
              controls={true}
              className="w-full h-full object-cover"
              onLoad={() => setIsLoading(false)}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
            />
          </div>

          <div
            className={`absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${
              isPlaying ? 'opacity-0' : ''
            }`}
          />
        </div>
      </div>

      <CardContent className="relative p-4 bg-gradient-to-b from-card/0 to-card/80">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 transform transition-transform duration-300">
            <h2 className="text-base font-semibold text-foreground line-clamp-1 transition-colors">
              {video.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2 transition-colors">
              {video.description}
            </p>
          </div>

          {canDelete && (
            <button
              onClick={handleDelete}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-destructive/10 hover:bg-destructive/20 border border-destructive/20 hover:border-destructive/40 transition-all duration-300"
              aria-label="Delete video"
            >
              <Trash2Icon className="w-4 h-4 text-destructive transition-colors duration-300" />
            </button>
          )}
        </div>
      </CardContent>

      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-primary/10 backdrop-blur-sm p-4 rounded-full border border-primary/20">
            <PlayCircle className="w-16 h-16 text-primary/80" />
          </div>
        </div>
      )}
    </Card>
  );
}
