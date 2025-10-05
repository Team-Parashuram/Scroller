/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { apiClient } from '@/lib/apiClient';
import CosmicLoader from '@/components/Loader';
import { IKVideo } from 'imagekitio-next';
import Header from '@/components/Header';
import { Play, Heart, MessageCircle, Share2, User } from 'lucide-react';

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res: any = await apiClient.getVideos();
        if (Array.isArray(res.data) && res.data.length > 0) {
          setVideos([...res.data, ...res.data, ...res.data]);
        } else {
          setError('No videos available.');
        }
      } catch {
        setError('Failed to load videos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen">
          <CosmicLoader />
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="glass-card p-8 text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
              <Play className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Videos Available</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      )}

      {!isLoading && !error && videos.length > 0 && (
        <div
          ref={containerRef}
          className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video, index) => (
            <div key={index} className="h-screen flex snap-center justify-center items-center bg-background relative">
              {/* Video Container */}
              <div className="relative w-full max-w-md h-full flex justify-center items-center">
                {/* Video Player */}
                <div className="relative w-full h-full">
                  <IKVideo
                    path={video.videoUrl}
                    transformation={[{ height: '1280', width: '720' }]}
                    controls={false}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                  
                  {/* Video Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                    <div className="space-y-3">
                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-foreground font-semibold text-sm">Creator</p>
                          <p className="text-muted-foreground text-xs">@username</p>
                        </div>
                      </div>
                      
                      {/* Title & Description */}
                      <div>
                        <h3 className="text-foreground font-bold text-lg mb-1">
                          {video.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side Actions */}
                <div className="absolute right-4 bottom-32 flex flex-col gap-6">
                  <button className="flex flex-col items-center gap-1 group pointer-events-auto">
                    <div className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all">
                      <Heart className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">0</span>
                  </button>
                  
                  <button className="flex flex-col items-center gap-1 group pointer-events-auto">
                    <div className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all">
                      <MessageCircle className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">0</span>
                  </button>
                  
                  <button className="flex flex-col items-center gap-1 group pointer-events-auto">
                    <div className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all">
                      <Share2 className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
