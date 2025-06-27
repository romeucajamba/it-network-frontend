"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {InputField} from "./inputField";
import { Lock } from "@/lib/icons";
import Link from "next/link";

export const RecoverPassword = () => {
  const [samePassword, setSamePassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(newPassword != samePassword){
      alert("Password need be the same");
    }else {
      alert("Password recovery submitted");
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Formulário de Recuperação */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8 text-center">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  Recuperando a palavra-pass
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-3">
                    Insira a nova senha
                  </label>
                  <InputField
                    icon={<Lock className="w-5 h-5" />}
                    placeholder=""
                    type="password"
                    value={newPassword}
                    onChange={setNewPassword}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-3">
                    Repetir nova senha
                  </label>
                  <InputField
                    icon={<Lock className="w-5 h-5" />}
                    placeholder=""
                    type="password"
                    value={samePassword}
                    onChange={setSamePassword}
                  />
                </div>
                <Link href="/login">
                  <Button
                  type="submit"
                  className="w-full h-[3rem] cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-[8px] text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg mt-8"
                  >
                  Entrar
                  </Button>
                </Link>
              </form>
            </div>
          </div>

          {/* Seção Ilustrativa */}
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 p-8 lg:p-12 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                {/* Simulação de interface */}
                <div className="space-y-4">
                  {/* Header simulado */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Cards simulados */}
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      <div className="flex-1">
                        <div className="w-3/4 h-3 bg-gray-200 rounded mb-1"></div>
                        <div className="w-1/2 h-2 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      <div className="flex-1">
                        <div className="w-2/3 h-3 bg-gray-200 rounded mb-1"></div>
                        <div className="w-3/4 h-2 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      <div className="flex-1">
                        <div className="w-4/5 h-3 bg-gray-200 rounded mb-1"></div>
                        <div className="w-1/3 h-2 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/15 rounded-full"></div>
            <div className="absolute top-1/2 left-0 w-12 h-12 bg-white/10 rounded-full -ml-6"></div>
            <div className="absolute bottom-1/4 right-0 w-10 h-10 bg-white/10 rounded-full -mr-5"></div>
            
            {/* Formas abstratas */}
            <div className="absolute top-20 right-20 w-8 h-8 bg-blue-300/30 transform rotate-45"></div>
            <div className="absolute bottom-32 left-16 w-6 h-6 bg-purple-300/40 rounded-full"></div>
            <div className="absolute top-1/3 right-8 w-4 h-4 bg-pink-300/50 transform rotate-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
