/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { apiClient } from '@/lib/apiClient';
import CosmicLoader from '@/components/Loader';
import { IKVideo } from 'imagekitio-next';
import Header from '@/components/Header';

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
      
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen">
          <CosmicLoader />
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="glass-card p-8 text-center max-w-md">
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
            <div key={index} className="h-screen flex snap-center justify-center items-center bg-background">
              <div className="w-full h-full flex justify-center items-center p-6">
                <div className="w-full max-w-4xl h-[90%]">
                  <IKVideo
                    path={video.videoUrl}
                    transformation={[{ height: '1280', width: '720' }]}
                    controls={true}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-contain rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
