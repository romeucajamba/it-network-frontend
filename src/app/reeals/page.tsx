"use client"
import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share, MoreVertical, Play, Volume2, VolumeX, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const reelsData = [
  {
    id: 1,
    author: "João Silva",
    username: "@joaodev",
    avatar: "/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "Tutorial de React Hooks em 60 segundos! 🚀 #ReactJS #WebDev",
    likes: 1247,
    comments: 89,
    shares: 23,
    isLiked: false,
    hashtags: ["#ReactJS", "#WebDev", "#Tutorial"]
  },
  {
    id: 2,
    author: "Maria Costa",
    username: "@mariatech",
    avatar: "/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description: "Como usar TypeScript no seu próximo projeto! 💪 #TypeScript #JavaScript",
    likes: 856,
    comments: 45,
    shares: 12,
    isLiked: true,
    hashtags: ["#TypeScript", "#JavaScript", "#Programming"]
  },
  {
    id: 3,
    author: "Carlos Lima",
    username: "@carlosdev",
    avatar: "/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "Dicas de CSS Grid que vão facilitar sua vida! ✨ #CSS #Frontend",
    likes: 2103,
    comments: 156,
    shares: 67,
    isLiked: false,
    hashtags: ["#CSS", "#Frontend", "#WebDesign"]
  }
];

export default function ReelsSection () {
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRefs = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const currentVideo = videoRefs.current[currentReel];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.play();
      } else {
        currentVideo.pause();
      }
    }
  }, [currentReel, isPlaying]);

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentReel > 0) {
      setCurrentReel(currentReel - 1);
    } else if (direction === 'down' && currentReel < reelsData.length - 1) {
      setCurrentReel(currentReel + 1);
    }
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* Main Video Container */}
      <div className="relative h-full flex items-center justify-center">
        <div className="relative w-full max-w-md h-full bg-black rounded-none overflow-hidden">
          <video
            ref={videoRefs}
            src={reelsData[currentReel].video}
            className="w-full h-full object-cover cursor-pointer"
            loop
            muted={isMuted}
            playsInline
            onClick={handleVideoClick}
          />

          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <div className="absolute cursor-pointer inset-0 flex items-center justify-center bg-black/20">
              <Play className="w-16 h-16 text-white animate-scale-in" />
            </div>
          )}

          {/* Video Controls */}
          <div className="absolute bottom-20 left-4 right-20 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10 border-2 border-white cursor-pointer">
                <AvatarImage src={reelsData[currentReel].avatar} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{reelsData[currentReel].author}</p>
                <p className="text-sm text-gray-300">{reelsData[currentReel].username}</p>
              </div>
              <Button size="sm" className="bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 ml-auto">
                Seguir
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">{reelsData[currentReel].description}</p>
              <div className="flex flex-wrap gap-1">
                {reelsData[currentReel].hashtags.map((tag, index) => (
                  <span key={index} className="text-purple-300 text-sm hover:text-purple-200 cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Side Actions */}
          <div className="absolute right-4 bottom-20 flex flex-col gap-6 items-center">
            <Button
              size="icon"
              variant="ghost"
              className={`w-12 h-12 rounded-full cursor-pointer bg-white/10 hover:bg-white/20 ${
                reelsData[currentReel].isLiked ? 'text-red-400' : 'text-white'
              }`}
            >
              <Heart className={`w-6 h-6 ${reelsData[currentReel].isLiked ? 'fill-current' : ''}`} />
            </Button>
            <span className="text-white text-xs font-medium">{reelsData[currentReel].likes}</span>

            <Button size="icon" variant="ghost" className="w-12 cursor-pointer h-12 rounded-full bg-white/10 hover:bg-white/20 text-white">
              <MessageCircle className="w-6 h-6" />
            </Button>
            <span className="text-white text-xs font-medium">{reelsData[currentReel].comments}</span>

            <Button size="icon" variant="ghost" className="w-12 cursor-pointer h-12 rounded-full bg-white/10 hover:bg-white/20 text-white">
              <Share className="w-6 h-6" />
            </Button>
            <span className="text-white text-xs font-medium">{reelsData[currentReel].shares}</span>

            <Button size="icon" variant="ghost" className="w-12 h-12 cursor-pointer rounded-full bg-white/10 hover:bg-white/20 text-white">
              <MoreVertical className="w-6 h-6" />
            </Button>
          </div>

          {/* Volume Control */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 w-10 h-10 cursor-pointer rounded-full bg-white/10 hover:bg-white/20 text-white"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
        <Button
          size="icon"
          variant="ghost"
          className="w-10 h-10 rounded-full cursor-pointer bg-white/10 hover:bg-white/20 text-white rotate-180"
          onClick={() => handleScroll('up')}
          disabled={currentReel === 0}
        >
          <span className="text-xl">▼</span>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="w-10 h-10 rounded-full cursor-pointer bg-white/10 hover:bg-white/20 text-white"
          onClick={() => handleScroll('down')}
          disabled={currentReel === reelsData.length - 1}
        >
          <span className="text-xl">▼</span>
        </Button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        {reelsData.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-all duration-300 ${
              index === currentReel ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
