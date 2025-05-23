import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator, ThemeProvider, defaultTheme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import PoweredBy from './components/PoweredBy';
import Resources from './components/Resources';
import Trends from './components/Trends'; 
import { Toaster, toast } from 'sonner';

// Customize the default theme
const customTheme = {
  name: 'sleek',
  ...defaultTheme,
  tokens: {
    ...defaultTheme.tokens,
    fonts: {
      default: {
        variable: { value: 'Inter, sans-serif' },
      },
    },
    colors: {
      ...defaultTheme.tokens.colors,
      background: {
        primary: { value: '#0f172a' },
        secondary: { value: '#1e293b' },
      },
      font: {
        primary: { value: '#f8fafc' },
        secondary: { value: '#94a3b8' },
      },
      brand: {
        primary: {
          10: '#0284c7',
          80: '#0ea5e9',
          90: '#38bdf8',
        },
      },
    },
    components: {
      button: {
        primary: {
          backgroundColor: { value: '#0ea5e9' },
          borderRadius: { value: '12px' },
          color: { value: '#ffffff' },
          _hover: {
            backgroundColor: { value: '#0284c7' },
            transform: 'scale(1.03)',
          },
          boxShadow: { value: '0 4px 12px rgba(14,165,233,0.3)' },
        },
      },
      field: {
        borderRadius: { value: '10px' },
        borderColor: { value: '#334155' },
        _focus: {
          borderColor: { value: '#0ea5e9' },
          boxShadow: { value: '0 0 0 2px rgba(14,165,233,0.4)' },
        },
      },
    },
  },
};

Amplify.configure(awsconfig);

function App() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'landing');

  // Sync tab state to localStorage on change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Authenticator signUpAttributes={['nickname']}>
        {({ signOut, user }) => (
          <div className="min-h-screen bg-[#0B0C10] text-[#F1F5F9] font-sans">
            <div className="max-w-4xl mx-auto p-6">
              {/* App Title and User */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
                <h1 className="text-3xl font-bold text-center sm:text-left">
                  RE MONITOR
                </h1>
                <div className="flex items-center gap-4">
                  <span className="text-base sm:text-lg font-semibold">
                    Welcome, {user?.attributes?.nickname || user?.username}
                  </span>
                  <button
                    onClick={signOut}
                    className="text-sm text-blue-400 hover:underline"
                  >
                    Sign Out
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-wrap gap-4 mb-8">
                {[
                  ['landing', 'How it Works'],
                  ['dashboard', 'Monitor'],
                  ['trends', 'Trends'],
                  ['resources', 'Resources'],
                  ['poweredby', 'Powered By'],
                ].map(([tab, label]) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-4 py-2 rounded-xl font-medium ${
                      activeTab === tab ? 'bg-blue-600 text-white' : 'bg-[#1C1F26] text-[#94A3B8]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </nav>

              {/* Tab Content */}
              {activeTab === 'landing' && <Landing />}
              {activeTab === 'dashboard' && <Dashboard user={user} />}
              {activeTab === 'trends' && <Trends user={user} />}
              {activeTab === 'resources' && <Resources />}
              {activeTab === 'poweredby' && <PoweredBy />}
            </div>
            <Toaster richColors position="top-right" />
          </div>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;