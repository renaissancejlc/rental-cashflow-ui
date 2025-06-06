import React, { useEffect, useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Link, useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center px-4">
      <div className="w-full max-w-lg p-6 sm:p-8 bg-[#1e293b] text-white rounded-xl shadow-2xl border border-[#334155]">
        <Link to="/" className="text-sm text-blue-400 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome to RE Monitor</h1>
        <p className="text-[#94a3b8] text-sm mb-6 text-center">Please sign in or create an account to get started</p>
        <div className="w-full max-w-screen-sm overflow-x-auto sm:overflow-visible">
          <Authenticator.Provider>
            <Authenticator loginMechanisms={['email']} signUpAttributes={['nickname']}>
              {({ signOut, user }) => {
                setUser(user);
                return (
                  <main>
                    <p className="mb-4">Welcome, {user?.attributes?.nickname}</p>
                    <button onClick={signOut} className="text-blue-400 underline">Sign out</button>
                  </main>
                );
              }}
            </Authenticator>
          </Authenticator.Provider>
        </div>
      </div>
    </div>
  );
}