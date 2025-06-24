"use client"
import  { WelcomeSection } from "./_components/wellCome";
import { LoginForm } from "./_components/loginForm";

const Signup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          <LoginForm />
          <WelcomeSection />
        </div>
      </div>
    </div>
  );
};

export default Signup;