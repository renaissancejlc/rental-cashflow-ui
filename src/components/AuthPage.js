import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center px-4">
      <div className="w-full max-w-lg p-6 sm:p-8 bg-[#1e293b] text-white rounded-xl shadow-2xl border border-[#334155]">
        <Link to="/" className="text-sm text-blue-400 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome to RE Monitor</h1>
        <p className="text-[#94a3b8] text-sm mb-6 text-center">Please sign in or create an account to get started</p>
        <div className="w-full max-w-screen-sm overflow-x-auto sm:overflow-visible">
          <Authenticator signUpAttributes={['nickname']} />
        </div>
      </div>
    </div>
  );
}