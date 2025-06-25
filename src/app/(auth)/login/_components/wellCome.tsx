"use client"
import Image from "next/image";
import Woman from "@/assets/woman.svg"

export const WelcomeSection = () => {
  return (
    <div className="lg:w-1/2 bg-gradient-to-br from-blue-200 to-blue-300 p-8 lg:p-12 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-4">
          Meeting Technology
        </h2>
      </div>
      
      <div className="relative w-full max-w-md">
        <Image 
          src={Woman}
          alt="Mulher usando laptop em uma cadeira"
          className="w-[40rem] h-auto object-contain"
        />
      </div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/15 rounded-full"></div>
      <div className="absolute top-1/2 left-0 w-12 h-12 bg-white/10 rounded-full -ml-6"></div>
      <div className="absolute bottom-1/4 right-0 w-10 h-10 bg-white/10 rounded-full -mr-5"></div>
    </div>
  );
};