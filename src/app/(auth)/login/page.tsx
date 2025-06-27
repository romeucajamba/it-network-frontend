"use client"
import { LoginForm } from "./_components/loginForm";

const Signup = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
          <LoginForm />
      </div>
    </div>
  );
};

export default Signup;