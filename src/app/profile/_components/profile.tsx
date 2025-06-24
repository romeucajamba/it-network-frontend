"use client"
import Image from 'next/image';
import React from 'react';
import { Cloud, Home, FileText, Settings } from 'lucide-react';
import UserLogo from "@/assets/user.svg";

export const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50 flex flex-col items-center py-6 space-y-8">
        <Home className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
        <div className="text-gray-400 text-sm">Meus espaço</div>
        <FileText className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
        <div className="text-gray-400 text-sm">Repositório</div>
        <Settings className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors mt-auto" />
        <div className="text-gray-400 text-sm">Definições</div>
      </div>

      {/* Main Content */}
      <div className="ml-16 p-8">
        {/* Header with Cloud Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-purple-500/50 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm">
              <Cloud className="w-16 h-16 text-purple-400" />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full border-2 border-purple-500 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="max-w-4xl mx-auto">
          {/* Name and Basic Info */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-6">Romeu Cajamba</h1>
            
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-500/50 bg-gradient-to-br from-pink-400 to-orange-400">
                <Image 
                  src={UserLogo} 
                  alt="Romeu Cajamba" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-gray-400 text-sm mb-2">Formação</h3>
                <p className="text-white">Engenharia de Software</p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-gray-400 text-sm mb-2">Residência</h3>
                <p className="text-white">Luanda, Angola</p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                <h3 className="text-gray-400 text-sm mb-2">Estado civil</h3>
                <p className="text-white">Solteiro</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
                <h3 className="text-gray-400 text-sm mb-2">Conexões</h3>
                <p className="text-2xl font-bold text-white">1209 mil</p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-gray-400 text-sm mb-2">Tipo de desenvolvedor</h3>
                    <p className="text-white">Full Stack</p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm mb-2">Tecnologias que uso</h3>
                    <p className="text-white">React, Node.js, Python</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
              <h2 className="text-2xl font-bold mb-4 text-center">Biografia</h2>
              <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/50">
                <p className="text-gray-300 leading-relaxed">
                  Sou fulano de xxxxxxx estudante de xxxxxx programa a xxxxx anos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};