"use client"
import { useState } from "react";
import { MoreHorizontal, Heart, MessageCircle, Share, Send, Paperclip, Smile } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import User from "@/assets/user.svg";
import Image from "next/image";

const posts = [
  {
    id: 1,
    author: "John Doe",
    avatar: "/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png",
    time: "August 21",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor mollis non posuere lorem ante nunc. Tellor dolor sit vel sit aliquam ut sagittis rhoncus non. Bibendum tincidunt dis risus quam cursus habitant est.",
    likes: 24,
    comments: 5,
    isLiked: false
  },
  {
    id: 2,
    author: "Jane Smith",
    avatar: "/lovable-uploads/1fc5e1bb-20cb-43f2-b88c-9f7babd34d35.png", 
    time: "August 21",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor mollis non posuere lorem ante nunc.",
    likes: 18,
    comments: 3,
    isLiked: true,
    hasAudio: true
  }
];

export const Feed = () => {
  const [newPost, setNewPost] = useState("");

  return (
    <div className="flex-1 bg-slate-900">
      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          
          {/* Create Post */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-start space-x-3">
              <Link href="/profile">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <div className="w-10 h-10 rounded-full overflow-hidden"> 
                    <Image 
                    src={User} 
                    alt="User avatar" 
                    width={10}
                    height={10}
                    className="w-10 h-10 object-cover"
                    />
                </div>
                 </AvatarFallback>
                </Avatar>
              </Link>
              
              <div className="flex-1">
                <Textarea
                  placeholder="What's happening?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 cursor-pointer hover:bg-transparent hover:text-white">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 cursor-pointer hover:bg-transparent hover:text-white">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    className="bg-gradient-to-r cursor-pointer from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    disabled={!newPost.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-medium">{post.author}</h3>
                    <p className="text-sm text-gray-400">{post.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 cursor-pinter hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{post.content}</p>

              {post.hasAudio && (
                <div className="bg-slate-700 rounded-lg p-4 mb-4 flex items-center space-x-3">
                  <Button size="icon" className="bg-gradient-to-r cursor-pinter from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                  </Button>
                  <div className="flex-1 h-8 bg-slate-600 cursor-pinter rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center space-x-1">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full ${
                            i < 15 ? 'bg-gradient-to-t from-pink-500 to-purple-500 h-6' : 'bg-gray-500 h-2'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">00:00 pm</span>
                </div>
              )}

              <div className="flex items-center space-x-6 text-gray-400">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`hover:text-red-400 cursor-pinter ${post.isLiked ? 'text-red-400' : ''}`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="hover:text-blue-400 cursor-pinter">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm" className="hover:text-green-400 cursor-pinter">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
