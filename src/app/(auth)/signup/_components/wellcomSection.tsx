"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Heart } from "@/lib/icons";;

export const WelcomeSection = () => {
  return (
    <div className="lg:w-1/2 backround-image p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            IT network
          </h1>
          
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Users className="w-8 h-8" />
              </div>
              <div className="w-20 h-16 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <div className="w-3 h-3 bg-white rounded-full mx-1"></div>
                <div className="w-3 h-3 bg-white/70 rounded-full mx-1"></div>
                <div className="w-3 h-3 bg-white/40 rounded-full mx-1"></div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 mb-8">
            <div className="bg-white h-2 rounded-full w-3/4 animate-pulse"></div>
          </div>

          <p className="text-lg lg:text-xl mb-2 opacity-90">
            Faça parte da nossa família de
          </p>
          <p className="text-lg lg:text-xl mb-2 opacity-90">
            amantes de tecnologia e de
          </p>
          <p className="text-lg lg:text-xl mb-8 text-pink-200 font-semibold flex items-center">
            conhecimento. <Heart className="w-5 h-5 ml-2 text-pink-300" />
          </p>

          <Link href="/login">
            <Button className="bg-white/20 cursor-pointer hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105">
              Já tenho uma conta
            </Button>
          </Link>

        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mb-16"></div>
      <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mt-12"></div>
    </div>
  );
};