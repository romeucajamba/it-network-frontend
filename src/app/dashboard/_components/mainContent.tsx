"use client"
import Image from "next/image";
import { Search } from "lucide-react";
import { SuggestionsSection } from "./sugestionsSection";
import {CoursesSection} from "./courseSection";
import UserLogo from "@/assets/user.svg";
import Link from "next/link";

export const MainContent = () => {
  return (
    <div className="flex-1 p-8 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Pesquisar"
            className="w-full bg-slate-800 text-white pl-10 pr-4 py-3 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        <div className="flex items-center space-x-4 ml-6">
          <div className="relative">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
              <span className="text-red-500 text-sm">🔔</span>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
          
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Link href="/profile">
              <Image 
              src={UserLogo} 
              alt="User avatar" 
              width={10}
              height={10}
              className="w-full h-full object-cover"
               />
            </Link>
            
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        <CoursesSection />
        <SuggestionsSection />
      </div>
    </div>
  );
};
