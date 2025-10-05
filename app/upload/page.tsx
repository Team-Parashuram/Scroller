'use client';

import { Upload, Video, Award, Shield, Lightbulb } from 'lucide-react';
import VideoUploadForm from '@/components/VideoUploadForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-display gradient-text mb-4">
            Upload Your Video
          </h1>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Share your creative content with our community and reach thousands of viewers
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Upload Form Section */}
          <div className="lg:col-span-7">
            <Card className="glass-card border-border/50 h-full professional-shadow">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-title text-foreground">
                    Upload New Video
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  Share your creative content and connect with the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-card/50 rounded-xl p-6 border border-border/30">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <VideoUploadForm />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Card className="glass-card border-border/50 hover-lift">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-lg text-foreground">
                  Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Maximum file size: 100MB
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Supported formats: MP4, MOV
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Maximum duration: 3 minutes
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Minimum duration: 1 minute
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card className="glass-card border-border/50 hover-lift">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-lg text-foreground">
                  Tips for Better Videos
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Use high-quality lighting
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Use proper tags
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Keep content engaging and concise
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Add relevant tags for better reach
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="glass-card border-border/50 hover-lift">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-lg text-foreground">
                  Community Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Respect intellectual property rights
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Fully secure database for videos and information
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    No explicit or harmful content
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Be mindful of community guidelines
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
