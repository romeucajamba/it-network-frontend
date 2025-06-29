import React, { useState } from 'react';
import { Send, Paperclip, Mic, MicOff, Smile, Image, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onSendAudio: (audio: Blob) => void;
  onSendFile: (file: File) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  //onSendAudio,
  onSendFile
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSendFile(file);
    }
    setShowAttachMenu(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording logic here
      setIsRecording(false);
    } else {
      // Start recording logic here
      setIsRecording(true);
    }
  };

  return (
    <div className="bg-slate-800 border-t border-slate-700 p-4">
      <div className="flex items-end space-x-2">
        <div className="relative">
          <Button
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            variant="ghost"
            size="icon"
            className="text-gray-400 cursor-pointer hover:text-white"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          
          {showAttachMenu && (
            <div className="absolute bottom-12 left-0 bg-slate-700 rounded-lg shadow-xl p-2 space-y-1 z-10">
              <label className="flex items-center space-x-2 p-2 hover:bg-slate-600 rounded cursor-pointer">
                <Image className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white">Imagem</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
              
              <label className="flex items-center space-x-2 p-2 hover:bg-slate-600 rounded cursor-pointer">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white">Documento</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite uma mensagem..."
            className="bg-slate-700 border-slate-600 text-white placeholder-gray-400 pr-12"
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white w-8 h-8"
          >
            <Smile className="w-4 h-4" />
          </Button>
        </div>

        {message.trim() ? (
          <Button
            onClick={handleSend}
            className="bg-gradient-to-r cursor-pointer from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={toggleRecording}
            className={`${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gradient-to-r cursor-pointer from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
        )}
      </div>
      
      {isRecording && (
        <div className="mt-2 flex items-center justify-center space-x-2 text-red-400">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Gravando áudio...</span>
        </div>
      )}
    </div>
  );
};