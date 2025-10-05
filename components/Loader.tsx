'use client';

import React from 'react';
import { Loader } from 'lucide-react';

export default function CosmicLoader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Lucide Loader Icon */}
      <Loader className="w-12 h-12 text-primary animate-spin" />
      
      {/* Loading text */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Loading</span>
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
