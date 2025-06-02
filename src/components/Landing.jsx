// src/components/Landing.jsx
import React from 'react';
import { TrendingUp, Settings, ShieldCheck, Rocket } from 'lucide-react';
import Footer from './Footer';

const Section = ({ icon: Icon, title, children }) => (
  <section className="max-w-3xl mx-auto space-y-4 py-10 px-4 border-b border-[#2D2F36]">
    <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
      <Icon className="w-6 h-6 text-blue-500" /> {title}
    </h2>
    <div className="text-[#CBD5E1] text-base leading-relaxed space-y-2">{children}</div>
  </section>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-texture">
      <header className="text-center py-14 px-4">
        <h1 className="text-4xl font-bold text-white mb-3">Real Estate Metrics Monitor</h1>
        <p className="text-lg text-[#94A3B8] max-w-xl mx-auto">
          Track, analyze, and compare real estate cash flow performance across cities to make smart, ethical investments.
        </p>
      </header>

      <Section icon={TrendingUp} title="What It Does">
        <ul className="list-disc list-inside space-y-1">
          <li>Calculate cash flow based on inputs like rent, purchase price, and expenses.</li>
          <li>Save and compare scenarios by location to uncover trends over time.</li>
          <li>Track ROI, break-even time, and net monthly income effortlessly.</li>
        </ul>
      </Section>

      <Section icon={ShieldCheck} title="Mission & Responsibility">
        <p>
          Being a rental property owner is about more than just owning homes, it’s about shaping neighborhoods and supporting the people who live in them.
        </p>
        <p>
          This app promotes a mindful approach to investing, encouraging landlords to provide clean, safe, and well-maintained housing. It’s a call to care and treat tenants with dignity and to invest in communities and families with intention.
        </p>
        <p>
          Together, we can set a higher standard for what responsible property ownership looks like.
        </p>
      </Section>

      <Section icon={Settings} title="How to Use">
        <ol className="list-decimal list-inside space-y-1">
          <li>Navigate to the “Monitor” tab.</li>
          <li>Enter financial info to calculate performance.</li>
          <li>Save results for different zip codes and compare.</li>
          <li>Switch cities to view trends in your saved data.</li>
        </ol>
      </Section>

      <Section icon={Rocket} title="Upcoming Features">
        <ul className="list-disc list-inside space-y-1">
          <li>Chrome extension to auto-scrape Zillow listings</li>
          <li>Graphs visualizing performance trends by city</li>
          <li>Heatmaps to highlight strong ROI zip codes</li>
          <li>Smart alerts for market shifts in your targets</li>
        </ul>
      </Section>
      <Footer />
    </div>
  );
};

export default Landing;