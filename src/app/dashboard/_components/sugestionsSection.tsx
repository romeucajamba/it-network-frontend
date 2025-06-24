"use client"
import Image from "next/image";
import { Globe, Send } from "lucide-react";
import UserLogo from "@/assets/user.svg";

export const SuggestionsSection = () => {
  const suggestions = [
    {
      id: 1,
      user: "Marvin McKinney",
      role: "Nursing Assistant",
      content: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      avatar: UserLogo
    },
    {
      id: 2,
      user: "Marvin McKinney", 
      role: "Nursing Assistant",
      content: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      avatar: UserLogo
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">Sugestões relevantes</h2>
        <button className="text-gray-400 hover:text-white">
          <span className="text-xl">⋮</span>
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 mb-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image 
              src={UserLogo}
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm mb-3">
              Compartilha pensamentos, estados, projetos e momentos
            </p>
            <div className="flex items-center space-x-3">
              <button className="text-gray-400 hover:text-white">
                <span className="text-xl">😊</span>
              </button>
              <button className="text-gray-400 hover:text-white">
                <Globe className="w-5 h-5" />
              </button>
              <button className="bg-pink-600 hover:bg-pink-700 p-2 rounded-lg transition-colors">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={suggestion.avatar} 
                  alt={suggestion.user} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-white font-medium">{suggestion.user}</h4>
                </div>
                <p className="text-gray-400 text-sm mb-2">{suggestion.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {suggestion.content}
                </p>
                <div className="mt-4 space-y-1">
                  <div className="text-gray-500 text-xs">asdfffffgghhjjjjjjkkkkkkk</div>
                  <div className="text-gray-500 text-xs">asdfffffgghhjjjjjjkkkkkkk</div>
                  <div className="text-gray-500 text-xs">asdfffffgghhjjjjjjjjjkkkkkkk</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
              <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-white">
                  <span className="text-xl">😊</span>
                </button>
                <button className="text-gray-400 hover:text-white">
                  <Globe className="w-5 h-5" />
                </button>
              </div>
              <button className="bg-pink-600 hover:bg-pink-700 p-2 rounded-lg transition-colors">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
