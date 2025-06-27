"use client";

import { WelcomeSection } from "./_components/wellcomSection";
import {RegistrationForm} from "./_components/registerForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          <WelcomeSection />
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Login;