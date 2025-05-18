// src/components/Landing.jsx
import React from 'react';
import { Card, CardContent } from './ui/card';
import { TrendingUp, Settings, ShieldCheck, Rocket } from 'lucide-react';

const Landing = () => {
  return (
    <div className="space-y-10 text-[#CBD5E1]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">RE Cash Flow Monitor</h1>
        <p className="text-lg text-[#94A3B8] max-w-xl mx-auto">
          Track, analyze, and compare real estate cash flow performance across cities to make smart, ethical investments.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-[#1C1F26] border border-[#2D2F36]">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              What It Does
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li>Calculate cash flow based on inputs like rent, purchase price, and expenses.</li>
              <li>Save and compare scenarios by location to uncover trends over time.</li>
              <li>Track ROI, break-even time, and net monthly income effortlessly.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#1C1F26] border border-[#2D2F36]">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <Settings className="w-5 h-5 text-blue-500" />
              How to Use
            </div>
            <ol className="list-decimal list-inside space-y-1">
              <li>Navigate to the “Monitor” tab.</li>
              <li>Enter financial info to calculate performance.</li>
              <li>Save results for different zip codes and compare.</li>
              <li>Switch cities to view trends in your saved data.</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1C1F26] border border-[#2D2F36]">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            Mission & Responsibility
          </div>
          <p>
           Being a rental property owner is about more than just owning homes, it’s about shaping neighborhoods and supporting the people who live in them.
        </p><p>
            This app promotes a mindful approach to investing, encouraging landlords to provide clean, safe, and well-maintained housing. It’s a call to care and treat tenants with dignity and to invest in communities and families with intention.
</p><p>
            Together, we can set a higher standard for what responsible property ownership looks like.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#1C1F26] border border-[#2D2F36]">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <Rocket className="w-5 h-5 text-blue-500" />
            Upcoming Features
          </div>
          <ul className="list-disc list-inside space-y-1">
            <li>Chrome extension to auto-scrape Zillow listings</li>
            <li>Graphs visualizing performance trends by city</li>
            <li>Heatmaps to highlight strong ROI zip codes</li>
            <li>Smart alerts for market shifts in your targets</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Landing;