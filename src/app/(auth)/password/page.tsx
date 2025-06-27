"use client";

import { RecoverPassword } from "./_components/changepasse";

const Password = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden">
          <RecoverPassword />
      </div>
    </div>
  );
};

export default Password;