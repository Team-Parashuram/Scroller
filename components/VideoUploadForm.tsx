'use client';

import { useState } from 'react';
import { IKUploadResponse } from 'imagekitio-next/dist/types/components/IKUpload/props';
import FileUpload from '@/app/component/FileUpload';
import { apiClient } from '@/lib/apiClient';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { VideoTag } from '@/Model/video.model';

export default function VideoUploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [tags, setTags] = useState<VideoTag[]>([]);
  const [errors, setErrors] = useState<{ title?: string; description?: string; tags?: string }>({});

  const availableTags = Object.values(VideoTag);

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setVideoUrl(response.filePath);
    setThumbnailUrl(response.thumbnailUrl || response.filePath);
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const toggleTag = (tag: VideoTag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const validateForm = () => {
    const newErrors: { title?: string; description?: string; tags?: string } = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (tags.length === 0) newErrors.tags = 'At least one tag is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !videoUrl) return;
    setLoading(true);
    try {
      await apiClient.createVideo({
        title,
        description,
        videoUrl,
        thumbnailUrl,
        tags,
      });
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setThumbnailUrl('');
      setTags([]);
      setUploadProgress(0);
    } catch {
      // Error handled - already shown by apiClient
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-foreground font-medium">
          Title
        </Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/20 focus:border-primary ${
            errors.title ? 'border-destructive focus:ring-destructive/20' : ''
          }`}
          placeholder="Enter video title"
        />
        {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-foreground font-medium">
          Description
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-primary/20 focus:border-primary min-h-[100px] ${
            errors.description ? 'border-destructive focus:ring-destructive/20' : ''
          }`}
          placeholder="Enter video description"
        />
        {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-foreground font-medium">Tags</Label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag, index) => (
            <button
              type="button"
              key={index}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                tags.includes(tag)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card text-foreground border-border hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        {errors.tags && <p className="text-destructive text-sm">{errors.tags}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-foreground font-medium">Upload Video</Label>
        <div className="bg-card border border-border rounded-lg p-4">
          <FileUpload fileType="video" onSuccess={handleUploadSuccess} onProgress={handleUploadProgress} />
          {uploadProgress > 0 && (
            <div className="mt-4">
              <Progress value={uploadProgress} className="h-2 bg-muted" />
              <p className="text-foreground text-sm mt-2">Upload progress: {Math.round(uploadProgress)}%</p>
            </div>
          )}
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={loading || !videoUrl} 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-colors disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Publishing...</span>
          </div>
        ) : (
          'Publish Video'
        )}
      </Button>
    </form>
  );
}
