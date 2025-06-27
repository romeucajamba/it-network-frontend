"use client"
import { ReactNode } from "react";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  icon: ReactNode;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  rightIcon?: ReactNode;
}

export const InputField = ({ icon, placeholder, type = "text", value, onChange, rightIcon }: InputFieldProps) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
        {icon}
      </div>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 pl-12 pr-12 bg-blue-50 border-blue-200 focus:border-blue-400 focus:bg-white transition-all duration-300 rounded-lg text-gray-700 placeholder:text-gray-400"
      />
      {rightIcon && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
          {rightIcon}
        </div>
      )}
    </div>
  );
};