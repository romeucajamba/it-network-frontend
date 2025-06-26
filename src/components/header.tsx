"use client"
//Hooks
import React, { useState, useEffect } from 'react';
//Componentes
import Image from 'next/image';
import { routes } from "@/lib/routes";
import UserLogo from "@/assets/user.svg";
import Link from "next/link";
import { LogOutModal } from "./logOut";
import { Button } from './ui/button';
import { LogOut } from "@/lib/icons";
import { NotificationsHover } from "./notificationHover";

export function Header ()  {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fechar menu mobile quando clicar em um link
  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevenir scroll quando menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        className={`
          w-full flex items-center p-4 lg:p-6 bg-[#1B191F] w-full transition-all duration-300
        `}
      >
        {/* Logo */}
        <div className="flex items-center z-50">
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center max-w-2xl ml-2">
          <ul className="flex justify-center items-center space-x-8 text-white">
            {routes.map((item, index) => (
              <li 
                key={item.id}
                className={`animate-slide-in-left`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <a 
                  href={item.url} 
                  className="nav-link cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 relative group"
                >
                  <item.icon size={24} />
                </a>
              </li>
            ))}
          </ul>
          <LogOutModal >
            <Button className="size-8 md:size-10 lg:size-10 xl:size-10 2xl:size-10 bg-transparent hover:bg-transparent cursor-pointer text-white hover:text-white shadow-none">
              <LogOut />
            </Button>
          </LogOutModal>

          <NotificationsHover />
        </nav>


        {/* Mobile Menu Button */}
        <div className='ml-auto'>
            <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden z-50 p-2 rounded-lg bg-[#FF5777]/10 hover:bg-[#FF5777]/20 transition-all duration-300"
            aria-label="Toggle mobile menu"
            >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span 
                className={`block w-5 h-0.5 bg-[#FF5777] transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                }`}
                ></span>
                <span 
                className={`block w-5 h-0.5 bg-[#FF5777] transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
                ></span>
                <span 
                className={`block w-5 h-0.5 bg-[#FF5777] transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                }`}
                ></span>
            </div>
            </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-in-out
          ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
      <div 
          className={`
            absolute inset-0 bg-[#1B191F]/95 backdrop-blur-md transition-all duration-500
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Menu Content */}
        <div 
          className={`
            relative h-full flex flex-col justify-center items-center transition-all duration-500 ease-out
            ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
          `}
        >
          {/* Navigation Links */}
          <nav className="flex flex-col items-center space-y-8 mb-12">
            {routes.map((item, index) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleMobileMenuClick}
                className={`
                  text-2xl font-semibold text-white hover:text-[#FF5777] 
                  transition-all duration-300 transform hover:scale-110 
                  relative group
                  ${isMobileMenuOpen ? 'animate-slide-in-left' : ''}
                `}
                style={{ 
                  animationDelay: isMobileMenuOpen ? `${index * 100 + 200}ms` : '0ms' 
                }}
              >
                {item.title}
                {/* Underline effect */}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#FF5777] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Buttons */}
          <div 
            className={`
              flex flex-col items-center space-y-4 w-full max-w-xs px-6
              ${isMobileMenuOpen ? 'animate-slide-in-up' : ''}
            `}
            style={{ animationDelay: isMobileMenuOpen ? '800ms' : '0ms' }}
          >
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-[#FF5777]/30 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-16 w-1 h-1 bg-[#FF5777]/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-[#FF5777]/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-12 w-1 h-1 bg-[#FF5777]/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
    </>
  );
};