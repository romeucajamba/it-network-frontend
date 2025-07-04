"use client";

import { useEffect, useRef, useState } from "react";
import { Send, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VirtualAssistant () {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Como posso te ajudar hoje?",
      isBot: true,
      time: "agora",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      time: "agora",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Entendi! Deixe-me processar sua solicitação...",
        isBot: true,
        time: "agora",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen w-full bg-slate-800 border-l border-slate-700 flex flex-col">
      {/* Header */}
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

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                msg.isBot ? "" : "flex-row-reverse space-x-reverse"
              }`}
            >
              {msg.isBot && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-2xl p-3 ${
                  msg.isBot
                    ? "bg-slate-700 text-gray-200"
                    : "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
              </div>
            </div>
          </div>
        ))}
        {/* Div oculta que forçará o scroll para o final */}
        <div ref={bottomRef} />
      </div>

      {/* Input Area - Sticky */}
      <div className="p-4 border-t border-slate-700 bg-slate-800 sticky bottom-0">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Digite sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
          />
          <Button
            onClick={sendMessage}
            disabled={!message.trim()}
            size="icon"
            className="bg-gradient-to-r cursor-pointer from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
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
