import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import PoweredBy from './components/PoweredBy';
import Resources from './components/Resources';

Amplify.configure(awsconfig);

function App() {
  const [activeTab, setActiveTab] = useState('landing');

  return (
    <Authenticator signUpAttributes={['nickname']}>
      {({ signOut, user }) => (
        <div className="min-h-screen bg-[#0B0C10] text-[#F1F5F9] font-sans">
          <div className="max-w-4xl mx-auto p-6">
            {/* Global App Title and User Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
              <h1 className="text-3xl font-bold text-center sm:text-left">
                RE CASH FLOW MONITOR
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
              <button
                onClick={() => setActiveTab('landing')}
                className={`px-4 py-2 rounded-xl font-medium ${activeTab === 'landing' ? 'bg-blue-600 text-white' : 'bg-[#1C1F26] text-[#94A3B8]'}`}
              >
                How it Works
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-xl font-medium ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-[#1C1F26] text-[#94A3B8]'}`}
              >
                Monitor
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`px-4 py-2 rounded-xl font-medium ${activeTab === 'resources' ? 'bg-blue-600 text-white' : 'bg-[#1C1F26] text-[#94A3B8]'}`}
              >
                Resources
              </button>
              <button
                onClick={() => setActiveTab('poweredby')}
                className={`px-4 py-2 rounded-xl font-medium ${activeTab === 'poweredby' ? 'bg-blue-600 text-white' : 'bg-[#1C1F26] text-[#94A3B8]'}`}
              >
                Powered By
              </button>
            </nav>

            {/* Tab Content */}
            {activeTab === 'landing' && <Landing />}
            {activeTab === 'dashboard' && <Dashboard user={user} />}
            {activeTab === 'resources' && <Resources />}
            {activeTab === 'poweredby' && <PoweredBy />}
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;