"use client"
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

interface StoryRingProps {
  avatar: string;
  name: string;
  hasUnseenStories?: boolean;
  isOwn?: boolean;
  onClick: () => void;
}

export const StoryRing = ({ 
  avatar, 
  name, 
  hasUnseenStories = false, 
  isOwn = false,
  onClick 
}: StoryRingProps) => {
  return (
    <div 
      className="flex flex-col items-center space-y-1 cursor-pointer group"
      onClick={onClick}
    >
      <div className={cn(
        "relative p-1 rounded-full transition-transform group-hover:scale-105",
        hasUnseenStories && "bg-gradient-to-tr from-yellow-400 to-pink-600",
        !hasUnseenStories && !isOwn && "bg-gray-300"
      )}>
        <Avatar className="w-16 h-16 border-2 border-white">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        {isOwn && (
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
            <Plus className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
      
      <span className="text-xs text-center max-w-16 truncate text-gray-100">
        {isOwn ? "Seu story" : name}
      </span>
    </div>
  );
};