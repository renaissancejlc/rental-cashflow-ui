// src/components/Landing.jsx
import React from 'react';

const Landing = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center">Real Estate Monitoring</h1>
      <p className="text-center text-[#94A3B8] text-lg">
        This utility helps you track and compare rental property scenarios in different cities, giving you the data you need to time your next investment.
      </p>

      <section className="mt-6 space-y-4">
        <h2 className="text-2xl font-semibold">📊 What It Does</h2>
        <ul className="list-disc list-inside text-[#CBD5E1]">
          <li>Calculate rental property cash flow based on your input (purchase price, rent, expenses, etc).</li>
          <li>Save and compare results by location to detect patterns over time.</li>
          <li>Track ROI, break-even time, and net monthly income.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">🛠️ How to Use</h2>
        <ol className="list-decimal list-inside text-[#CBD5E1]">
          <li>Go to the “Monitor” tab above.</li>
          <li>Fill in property and financial info to calculate performance.</li>
          <li>Save scenarios for different zip codes to compare later.</li>
          <li>Switch locations to view your full history and trends.</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">🌱 Mission & Responsibility</h2>
        <p className="text-[#CBD5E1]">
          Being a rental property investor is not just about generating profit — it’s also about creating real impact.
        </p>
        <p className="text-[#CBD5E1]">
          This app encourages responsible investing that supports communities, not exploits them. The goal is to provide clean, safe, and well-maintained homes to families in need — particularly those relying on programs like Section 8.
        </p>
        <p className="text-[#CBD5E1]">
          With smart planning, it’s entirely possible to be both profitable <span className="italic">and</span> ethical. Let’s raise the standard for what it means to be a landlord.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">🚀 Next Features (Coming Soon)</h2>
        <ul className="list-disc list-inside text-[#CBD5E1]">
            <li>
  Chrome extension that detects Zillow listings and extracts data like price, rent, and zip code to sync or copy into the app
</li>
          <li>Graph-based trend visualization per city</li>
          <li>Zip code heatmaps based on your ROI</li>
          <li>Market alerts when average cash flow spikes or dips</li>
        </ul>
      </section>
    </div>
  );
};

export default Landing;