import VideoComponent from './VideoComponent';
import { IVideo } from '@/Model/video.model';
import { Video } from 'lucide-react';

export default function VideoFeed({ videos }: { videos: IVideo[] }) {
  return (
    <div className="relative w-full">
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {videos.map((video, index) => (
            <div 
              key={video._id?.toString()} 
              className="transform transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <VideoComponent video={video} />
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-[400px] flex items-center justify-center px-4">
          <div className="glass-card p-12 max-w-md text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Video className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Videos Found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              There are no videos to display at the moment. Check back later or be the first to share something amazing!
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}