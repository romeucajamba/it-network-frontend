"use client";

import { RecoverPassword } from "./_components/passwordRecovery";

const Password = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          <RecoverPassword />
      </div>
    </div>
  );
};

export default Password;