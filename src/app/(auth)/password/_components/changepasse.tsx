"use client"
import { Mail, Lock, ArrowLeft } from "@/lib/icons";
import Link  from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";
import { Button } from "@/components/ui/button";
type RecoveryStep = 'email' | 'code' | 'password';
import { InputField } from "@/components/inputField";

export const RecoverPassword = () => {
  const [currentStep, setCurrentStep] = useState<RecoveryStep>('email');
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Por favor, insira seu email");
      return;
    }
    
    setIsLoading(true);
    // Simular envio de email
    setTimeout(() => {
      setIsLoading(false);
      alert("Código enviado para seu email!");
      setCurrentStep('code');
    }, 2000);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      alert("Por favor, insira o código de 6 dígitos");
      return;
    }
    
    setIsLoading(true);
    // Simular verificação do código
    setTimeout(() => {
      setIsLoading(false);
      alert("Código verificado com sucesso!");
      setCurrentStep('password');
    }, 1500);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    
    if (newPassword.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    
    setIsLoading(true);
    // Simular redefinição de senha
    setTimeout(() => {
      setIsLoading(false);
      alert("Senha redefinida com sucesso!");
      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }, 2000);
  };

  const goBack = () => {
    if (currentStep === 'code') {
      setCurrentStep('email');
    } else if (currentStep === 'password') {
      setCurrentStep('code');
    }
  };

  const renderEmailStep = () => (
    <form onSubmit={handleSendEmail} className="space-y-6">
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-3">
          E-mail
        </label>
        <InputField
          icon={<Mail className="w-5 h-5" />}
          placeholder="Digite seu email"
          type="email"
          value={email}
          onChange={setEmail}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-[3rem] cursor-pointer rounded-[8px] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
      >
        {isLoading ? "Enviando..." : "Enviar Código"}
      </Button>
    </form>
  );

  const renderCodeStep = () => (
    <form onSubmit={handleVerifyCode} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600 text-sm">
          Enviamos um código de 6 dígitos para <strong>{email}</strong>
        </p>
      </div>
      
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-3 text-center">
          Código de Verificação
        </label>
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || code.length !== 6}
        className="w-full h-[3rem] cursor-pointer rounded-[8px] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4  text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
      >
        {isLoading ? "Verificando..." : "Verificar Código"}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => handleSendEmail({ preventDefault: () => {} } as any)}
          className="text-blue-500 text-sm hover:text-blue-600 transition-colors"
        >
          Reenviar código
        </button>
      </div>
    </form>
  );

  const renderPasswordStep = () => (
    <form onSubmit={handleResetPassword} className="space-y-6">
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-3">
          Nova Senha
        </label>
        <InputField
          icon={<Lock className="w-5 h-5" />}
          placeholder="Digite sua nova senha"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-3">
          Confirmar Nova Senha
        </label>
        <InputField
          icon={<Lock className="w-5 h-5" />}
          placeholder="Confirme sua nova senha"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-[3rem] cursor-pointer rounded-[8px] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
      >
        {isLoading ? "Redefinindo..." : "Redefinir Senha"}
      </Button>
    </form>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 'email':
        return 'Recuperar Palavra-passe';
      case 'code':
        return 'Verificar Código';
      case 'password':
        return 'Nova Palavra-passe';
      default:
        return 'Recuperar Palavra-passe';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 'email':
        return 'Digite seu email para receber o código de recuperação';
      case 'code':
        return 'Insira o código de 6 dígitos enviado para seu email';
      case 'password':
        return 'Crie uma nova senha para sua conta';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Formulário de Recuperação */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8 text-center">
                <div className="w-16 h-1 bg-pink-500 mx-auto mb-6 rounded-full"></div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2"></h1>
                                  {getStepTitle()}
                <p className="text-gray-600 text-sm">
                  {getStepDescription()}
                </p>
              </div>

              {/* Indicador de Progresso */}
              <div className="flex justify-center mb-8">
                <div className="flex space-x-2">
                  <div className={`w-3 h-3 rounded-full ${currentStep === 'email' ? 'bg-blue-500' : currentStep === 'code' || currentStep === 'password' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${currentStep === 'code' ? 'bg-blue-500' : currentStep === 'password' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${currentStep === 'password' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                </div>
              </div>

              {currentStep === 'email' && renderEmailStep()}
              {currentStep === 'code' && renderCodeStep()}
              {currentStep === 'password' && renderPasswordStep()}

              <div className="flex justify-between items-center mt-6">
                {currentStep !== 'email' && (
                  <button
                    onClick={goBack}
                    className="flex cursor-pointer items-center text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Voltar
                  </button>
                )}
                
                <Link
                  href="/login"
                  className="text-blue-500 cursor-pointer text-sm hover:text-blue-600 transition-colors ml-auto"
                >
                  Voltar ao login
                </Link>
              </div>
            </div>
          </div>

          {/* Seção Ilustrativa */}
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 p-8 lg:p-12 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                {/* Simulação de interface de recuperação */}
                <div className="space-y-4">
                  {/* Header simulado */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Lock className="w-4 h-4 text-white" />
                      </div>
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Simulação dos passos */}
                  <div className="space-y-3">
                    <div className={`bg-gray-50 rounded-xl p-4 flex items-center space-x-3 ${currentStep === 'email' ? 'ring-2 ring-blue-300' : ''}`}>
                      <Mail className="w-6 h-6 text-blue-500" />
                      <div className="flex-1">
                        <div className="w-20 h-3 bg-blue-200 rounded mb-1"></div>
                        <div className="w-16 h-2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    
                    <div className={`bg-gray-50 rounded-xl p-4 flex items-center space-x-3 ${currentStep === 'code' ? 'ring-2 ring-blue-300' : ''}`}>
                      <div className="w-6 h-6 bg-yellow-500 rounded flex items-center justify-center text-white text-xs font-bold">
                        #
                      </div>
                      <div className="flex-1">
                        <div className="w-24 h-3 bg-yellow-200 rounded mb-1"></div>
                        <div className="w-20 h-2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    
                    <div className={`bg-gray-50 rounded-xl p-4 flex items-center space-x-3 ${currentStep === 'password' ? 'ring-2 ring-blue-300' : ''}`}>
                      <Lock className="w-6 h-6 text-green-500" />
                      <div className="flex-1">
                        <div className="w-28 h-3 bg-green-200 rounded mb-1"></div>
                        <div className="w-18 h-2 bg-gray-200 rounded"></div>
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
}