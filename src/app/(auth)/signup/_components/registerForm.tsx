"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/inputField";
import { User, Mail, Lock, Eye, EyeOff, Calendar, MapPin, Briefcase, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    country: "",
    workArea: "",
    gender: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={<User className="w-5 h-5" />}
            placeholder="Nome de usuário"
            value={formData.username}
            onChange={(value) => handleInputChange("username", value)}
          />

          <InputField
            icon={<Mail className="w-5 h-5" />}
            placeholder="E-mail"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
          />

          <InputField
            icon={<Lock className="w-5 h-5" />}
            placeholder="Senha de usuário"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(value) => handleInputChange("password", value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
          />

          <InputField
            icon={<Lock className="w-5 h-5" />}
            placeholder="Confirmar senha"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(value) => handleInputChange("confirmPassword", value)}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Select onValueChange={(value) => handleInputChange("birthDate", value)}>
                <SelectTrigger className="h-14 bg-blue-50 border-blue-200 focus:border-indigo-500 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <SelectValue placeholder="Data de nascimento" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1990">1990</SelectItem>
                  <SelectItem value="1991">1991</SelectItem>
                  <SelectItem value="1992">1992</SelectItem>
                  <SelectItem value="1993">1993</SelectItem>
                  <SelectItem value="1994">1994</SelectItem>
                  <SelectItem value="1995">1995</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select onValueChange={(value) => handleInputChange("country", value)}>
                <SelectTrigger className="h-14 bg-blue-50 border-blue-200 focus:border-indigo-500 transition-colors">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <SelectValue placeholder="País" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brazil">Brasil</SelectItem>
                  <SelectItem value="portugal">Portugal</SelectItem>
                  <SelectItem value="usa">Estados Unidos</SelectItem>
                  <SelectItem value="canada">Canadá</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Select onValueChange={(value) => handleInputChange("workArea", value)}>
                <SelectTrigger className="h-14 bg-blue-50 border-blue-200 focus:border-indigo-500 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <SelectValue placeholder="Área de atuação" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Desenvolvimento</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="management">Gestão</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger className="h-14 bg-blue-50 border-blue-200 focus:border-indigo-500 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <SelectValue placeholder="Gênero" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Feminino</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                  <SelectItem value="not-informed">Prefiro não informar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-[3rem] cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-[8px] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Cadastrar-se
          </Button>
        </form>
      </div>
    </div>
  );
};