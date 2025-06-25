"use client"
import React from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaViewerProps {
  mediaUrl: string;
  onClose: () => void;
}

export const MediaViewer: React.FC<MediaViewerProps> = ({ mediaUrl, onClose }) => {
  const isVideo = mediaUrl.includes('.mp4') || mediaUrl.includes('.webm');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative max-w-4xl max-h-full p-4">
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          >
            <Download className="w-5 h-5" />
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {isVideo ? (
          <video
            src={mediaUrl}
            controls
            className="max-w-full max-h-full rounded-lg"
          />
        ) : (
          <img
            src={mediaUrl}
            alt="Media preview"
            className="max-w-full max-h-full rounded-lg"
          />
        )}
      </div>
    </div>
  );
};