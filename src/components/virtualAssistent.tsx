"use client"

import { useState } from "react";
import { Send, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export const VirtualAssistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Como posso te ajudar hoje?",
      isBot: true,
      time: "agora"
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      time: "agora"
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Entendi! Deixe-me processar sua solicitação...",
        isBot: true,
        time: "agora"
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className=" w-[] bg-slate-800 border-l border-slate-700 flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              AI
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-white">Assistente Virtual</h2>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Online</span>
            </div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${msg.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                {msg.isBot && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-2xl p-3 ${
                  msg.isBot 
                    ? 'bg-slate-700 text-gray-200' 
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 pr-10"
            />
          </div>
          
          <Button 
            onClick={sendMessage}
            disabled={!message.trim()}
            size="icon"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="mt-3 flex justify-center">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
