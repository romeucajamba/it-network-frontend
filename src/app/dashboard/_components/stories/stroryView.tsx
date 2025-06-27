"use client"
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Story } from "@/types/story";

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onStoryViewed: (storyId: string) => void;
}

export const StoryViewer = ({ 
  stories, 
  initialIndex, 
  isOpen, 
  onClose, 
  onStoryViewed 
}: StoryViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);

  const currentStory = stories[currentIndex];

 useEffect(() => {
  if (isOpen && currentStory && !currentStory.viewed) {
    onStoryViewed(currentStory.id);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentStory?.id]);

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  if (!currentStory) return null;

  const timeAgo = Math.floor((Date.now() - currentStory.createdAt.getTime()) / (1000 * 60 * 60));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-screen p-0 border-none">
        <DialogTitle className="text-white"></DialogTitle>
        <div className="relative w-full h-full flex flex-col">
          {/* Progress bars */}
          <div className="absolute left-2 right-2 z-20 flex space-x-1">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-white/30 rounded">
                <div 
                  className="h-full bg-white rounded transition-all duration-100"
                  style={{ 
                    width: index < currentIndex ? '100%' : 
                           index === currentIndex ? `${progress}%` : '0%' 
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-6 left-2 right-2 z-20 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentStory.userAvatar} alt={currentStory.userName} />
                <AvatarFallback>{currentStory.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white text-sm font-medium">{currentStory.userName}</p>
                <p className="text-white/70 text-xs">{timeAgo}h</p>
              </div>
            </div>
          </div>

          {/* Story content */}
          <div className="flex-1 relative flex items-center justify-center">
            {currentStory.image ? (
              <img 
                src={currentStory.image} 
                alt="Story" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <p className="text-white text-xl font-bold text-center px-4">
                  {currentStory.content}
                </p>
              </div>
            )}

            {currentStory.image && currentStory.content && (
              <div className="absolute bottom-20 left-4 right-4">
                <p className="text-white text-lg font-medium text-center bg-black/50 p-3 rounded-lg">
                  {currentStory.content}
                </p>
              </div>
            )}

            {/* Navigation areas */}
            <div 
              className="absolute left-0 top-0 w-1/3 h-full cursor-pointer z-10"
              onClick={handlePrevious}
            />
            <div 
              className="absolute right-0 top-0 w-1/3 h-full cursor-pointer z-10"
              onClick={handleNext}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};