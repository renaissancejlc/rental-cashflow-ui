// src/components/Resources.jsx
import React from 'react';
import { ExternalLink, Building2, FileText, MapPinned, Calculator } from 'lucide-react';

const resources = [
  {
    title: 'Rental Property Calculator',
    url: 'https://www.calculator.net/rental-property-calculator.html',
    description: 'Quickly calculate ROI, cash flow, and cap rate for any rental property using this interactive tool.',
    icon: <Calculator className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'HUD Fair Market Rents',
    url: 'https://www.huduser.gov/portal/datasets/fmr.html',
    description: 'Check fair market rents (FMR) in your target area to align with Section 8 or affordable housing rates.',
    icon: <Building2 className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'HUD Inspection Checklist (PDF)',
    url: 'https://www.hud.gov/sites/dfiles/OCHCO/documents/52580-A-1_HQSChecklist.pdf',
    description: 'Review the checklist HUD uses to inspect Section 8 homes. Great for ensuring compliance before renting.',
    icon: <FileText className="w-5 h-5 text-blue-400" />
  },
  {
    title: 'City-Data.com',
    url: 'https://www.city-data.com/',
    description: 'Look up city demographics, neighborhood crime stats, cost of living, schools, and more.',
    icon: <MapPinned className="w-5 h-5 text-blue-400" />
  }
];

const Resources = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">🏗️ Real Estate Resources</h1>
        <p className="text-[#94A3B8] text-lg">
          Helpful links to evaluate and research potential rental properties.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((resource, idx) => (
          <a
            key={idx}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#1C1F26] border border-[#2D2F36] rounded-xl p-5 shadow-md hover:shadow-lg hover:border-blue-600 transition"
          >
            <div className="flex items-center gap-2 mb-2">
              {resource.icon}
              <h3 className="text-xl font-semibold text-blue-400 flex-1">{resource.title}</h3>
              <ExternalLink className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <p className="text-[#CBD5E1] text-sm">{resource.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Resources;
